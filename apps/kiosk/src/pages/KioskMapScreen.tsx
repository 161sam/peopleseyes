/**
 * Kiosk-spezifischer Map-Screen.
 * Nutzt dieselbe Logik wie apps/web, aber importiert ausschließlich
 * aus workspace-Paketen – keine cross-app relativen Pfade.
 *
 * CRIT-02 fix: P2P-Sync und lokaler Store werden initialisiert,
 * CellAggregates werden geladen und auf der Karte angezeigt.
 */
import React, { useRef, useEffect, useState, useCallback } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { CellAggregate } from '@peopleseyes/core-model';
import { getCellBoundary, scoreToColor } from '@peopleseyes/core-logic';
import { useKioskProfile } from '../hooks/useKioskProfile.js';
import { kioskReportStore } from '../services/kiosk-report-store.js';
import { kioskP2pSync } from '../services/kiosk-p2p-sync.js';


const KioskMapScreen: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [selectedCell, setSelectedCell] = useState<CellAggregate | null>(null);
  const [aggregates, setAggregates] = useState<CellAggregate[]>([]);
  const { profile } = useKioskProfile();

  const center = profile?.mapCenter
    ? [profile.mapCenter.lng, profile.mapCenter.lat] as [number, number]
    : [10.0, 51.3] as [number, number];
  const zoom = profile?.mapCenter?.zoom ?? 7;

  // Karte mit GeoJSON-Polygonen aktualisieren
  const renderAggregates = useCallback((aggs: CellAggregate[]) => {
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
  }, []);

  // P2P + Store initialisieren und laufende Updates empfangen
  useEffect(() => {
    let mounted = true;

    const init = async () => {
      await kioskReportStore.init();
      await kioskP2pSync.init();
      if (!mounted) return;
      const local = await kioskReportStore.computeAllAggregates();
      if (mounted) setAggregates(local);
    };
    void init();

    const unsubP2P = kioskP2pSync.onCellUpdate(incoming => {
      if (!mounted) return;
      setAggregates(prev => {
        const idx = prev.findIndex(a => a.cellId === incoming.cellId);
        if (idx === -1) return [...prev, incoming];
        const next = [...prev];
        next[idx] = incoming;
        return next;
      });
    });

    return () => {
      mounted = false;
      unsubP2P();
    };
  }, []);

  // Aggregates auf Karte rendern sobald Karte bereit oder Daten sich ändern
  useEffect(() => {
    if (!map.current) return;
    if (map.current.isStyleLoaded()) {
      renderAggregates(aggregates);
    } else {
      const onLoad = () => renderAggregates(aggregates);
      map.current.once('load', onLoad);
      return () => { map.current?.off('load', onLoad); };
    }
  }, [aggregates, renderAggregates]);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://tiles.openfreemap.org/styles/liberty',
      center,
      zoom,
      attributionControl: false,
    });

    map.current.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-right');

    map.current.on('load', () => {
      map.current!.addSource('cells', { type: 'geojson', data: { type: 'FeatureCollection', features: [] } });
      map.current!.addLayer({ id: 'cells-fill', type: 'fill', source: 'cells', paint: { 'fill-color': ['get', 'color'], 'fill-opacity': 0.45 } });
      map.current!.addLayer({ id: 'cells-outline', type: 'line', source: 'cells', paint: { 'line-color': ['get', 'color'], 'line-width': 1.5 } });

      map.current!.on('click', 'cells-fill', e => {
        const props = e.features?.[0]?.properties as (CellAggregate & { color: string }) | undefined;
        if (props) setSelectedCell(props);
      });

      // Viewport-Änderungen an P2P weitergeben
      map.current!.on('moveend', () => {
        if (!map.current) return;
        const b = map.current.getBounds();
        kioskP2pSync.setViewport({ north: b.getNorth(), south: b.getSouth(), east: b.getEast(), west: b.getWest() });
      });
    });

    return () => { map.current?.remove(); map.current = null; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative w-full h-full" style={{ minHeight: 'calc(100vh - 8rem)' }}>
      <div ref={mapContainer} className="absolute inset-0" />
      {selectedCell && (
        <div className="absolute bottom-4 left-3 right-3 bg-slate-900/95 rounded-xl p-4 z-10">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-slate-100">Sichtungen in diesem Bereich</span>
            <button onClick={() => setSelectedCell(null)} className="text-slate-400 text-lg">×</button>
          </div>
          <div className="grid grid-cols-2 gap-1 text-xs text-slate-400">
            <span>Meldungen</span><span className="text-slate-200">{selectedCell.reportCount}</span>
            <span>Confidence</span><span className="text-slate-200">{Math.round(selectedCell.aggregateScore * 100)} %</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default KioskMapScreen;
