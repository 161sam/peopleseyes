import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { CellAggregate } from '@peopleseyes/core-model';
import { getCellBoundary, getCellCenter } from '@peopleseyes/core-logic';
import { useReports } from '../hooks/useReports.js';
import { useGeolocation } from '../hooks/useGeolocation.js';
import { useUserSettings } from '../hooks/useUserSettings.js';
import { useI18n } from '../hooks/useI18n.js';
import { p2pSync } from '../services/p2p-sync.js';

/** Farbe des Hexagons je aggregateScore (0–1) */
function scoreToColor(score: number): string {
  if (score >= 0.8) return '#E24B4A'; // rot – hoch
  if (score >= 0.5) return '#EF9F27'; // amber – mittel
  if (score >= 0.2) return '#1D9E75'; // grün – niedrig
  return '#378ADD';                    // blau – sehr niedrig
}

const MapScreen: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const centeredRef = useRef(false);
  const { aggregates, isLoading } = useReports();
  const { rawCoords } = useGeolocation();
  const [selectedCell, setSelectedCell] = useState<CellAggregate | null>(null);
  const { settings } = useUserSettings();
  const { t } = useI18n(settings.locale);

  // Karte initialisieren
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      // OpenFreeMap – kein API-Key, kein Tracking
      style: 'https://tiles.openfreemap.org/styles/liberty',
      center: [10.0, 51.3], // Deutschland-Mitte
      zoom: 6,
      attributionControl: false,
    });

    map.current.addControl(
      new maplibregl.AttributionControl({ compact: true }),
      'bottom-right',
    );
    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

    map.current.on('load', () => {
      // GeoJSON-Quellen für Zellen-Overlays anlegen
      map.current!.addSource('cells', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] },
      });

      // Hexagon-Fill
      map.current!.addLayer({
        id: 'cells-fill',
        type: 'fill',
        source: 'cells',
        paint: {
          'fill-color': ['get', 'color'],
          'fill-opacity': 0.45,
        },
      });

      // Hexagon-Outline
      map.current!.addLayer({
        id: 'cells-outline',
        type: 'line',
        source: 'cells',
        paint: {
          'line-color': ['get', 'color'],
          'line-width': 1.5,
          'line-opacity': 0.8,
        },
      });

      // Klick-Handler
      map.current!.on('click', 'cells-fill', e => {
        const feature = e.features?.[0];
        if (!feature) return;
        const props = feature.properties as CellAggregate & { color: string };
        setSelectedCell(props);
      });

      map.current!.on('mouseenter', 'cells-fill', () => {
        if (map.current) map.current.getCanvas().style.cursor = 'pointer';
      });
      map.current!.on('mouseleave', 'cells-fill', () => {
        if (map.current) map.current.getCanvas().style.cursor = '';
      });

      // Viewport-Änderungen an P2P-Service weitergeben
      map.current!.on('moveend', () => {
        if (!map.current) return;
        const b = map.current.getBounds();
        p2pSync.setViewport({ north: b.getNorth(), south: b.getSouth(), east: b.getEast(), west: b.getWest() });
      });
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  /** Rendert die aktuellen Aggregates auf die Karte. */
  const renderAggregates = (aggs: typeof aggregates) => {
    const source = map.current?.getSource('cells') as maplibregl.GeoJSONSource | undefined;
    if (!source) return;
    const features = aggs.map(agg => {
      const boundary = getCellBoundary(agg.cellId);
      return {
        type: 'Feature' as const,
        properties: { ...agg, color: scoreToColor(agg.aggregateScore) },
        geometry: {
          type: 'Polygon' as const,
          coordinates: [[...boundary, boundary[0]!]],
        },
      };
    });
    source.setData({ type: 'FeatureCollection', features });
  };

  // BUG-02 fix: wenn Style noch lädt, Aggregates in 'load'-Event nachrendern
  useEffect(() => {
    if (!map.current) return;
    if (map.current.isStyleLoaded()) {
      renderAggregates(aggregates);
    } else {
      const onLoad = () => renderAggregates(aggregates);
      map.current.once('load', onLoad);
      return () => { map.current?.off('load', onLoad); };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aggregates]);

  useEffect(() => {
    if (!map.current || !rawCoords || centeredRef.current) return;
    centeredRef.current = true;
    map.current.flyTo({ center: [rawCoords.lng, rawCoords.lat], zoom: 12, duration: 1200 });
  }, [rawCoords]);

  return (
    <div className="relative w-full h-full" style={{ minHeight: 'calc(100vh - 4rem)' }}>
      {/* Kartencontainer */}
      <div ref={mapContainer} className="absolute inset-0" />

      {/* Lade-Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/60 z-10">
          <div className="flex flex-col items-center gap-2 text-slate-300">
            <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm">{t.map.loading}</span>
          </div>
        </div>
      )}

      {/* Legende */}
      <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-sm rounded-lg p-3 z-10 text-xs text-slate-300 space-y-1.5">
        <div className="font-medium text-slate-100 mb-2">{t.map.title}</div>
        {[
          { color: '#E24B4A', label: 'Hoch' },
          { color: '#EF9F27', label: 'Mittel' },
          { color: '#1D9E75', label: 'Niedrig' },
          { color: '#378ADD', label: 'Einzeln' },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: color }} />
            {label}
          </div>
        ))}
        {aggregates.length > 0 && (
          <div className="pt-1.5 border-t border-slate-700 text-slate-400">
            {aggregates.length} aktive Zellen
          </div>
        )}
      </div>

      {/* Zell-Detail-Popup */}
      {selectedCell && (
        <div className="absolute bottom-4 left-3 right-3 bg-slate-900/95 backdrop-blur-sm rounded-xl p-4 z-10 shadow-xl">
          <div className="flex items-start justify-between mb-2">
            <span className="text-sm font-medium text-slate-100">Sichtungen in diesem Bereich</span>
            <button
              onClick={() => setSelectedCell(null)}
              className="text-slate-400 hover:text-slate-200 text-lg leading-none ml-2"
            >
              ×
            </button>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-400">
            <span>{t.map.reportsInArea}</span>
            <span className="text-slate-200">{selectedCell.reportCount}</span>
            <span>{t.report.authorityLabel}</span>
            <span className="text-slate-200 truncate">{t.authority[selectedCell.dominantAuthorityCategory]}</span>
            <span>{t.report.activityLabel}</span>
            <span className="text-slate-200 truncate">{t.activity[selectedCell.dominantActivityType]}</span>
            <span>{t.report.confidenceLabel}</span>
            <span className="text-slate-200">{Math.round(selectedCell.aggregateScore * 100)} %</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapScreen;

