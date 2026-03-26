import React, { useRef, useEffect, useState, useCallback } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { AuthorityCategory, CellAggregate, ObservedActivityType } from '@peopleseyes/core-model';
import { getCellBoundary, getCellCenter, scoreToColor } from '@peopleseyes/core-logic';
import { useReports } from '../hooks/useReports.js';
import { useTimelineFilter } from '../hooks/useTimelineFilter.js';
import { useUserSettings } from '../hooks/useUserSettings.js';
import { useI18n } from '../hooks/useI18n.js';
import { useExternalAggregates } from '../hooks/useExternalAggregates.js';
import { p2pSync } from '../services/p2p-sync.js';
import { TimelineSlider } from '../components/TimelineSlider.js';
import QuickReportSheet from '../components/QuickReportSheet.js';
import type { GeoProps } from '../App.js';

interface MapScreenProps {
  geoProps: GeoProps;
  onNavigateToReport?: (prefill?: { authority?: AuthorityCategory; activity?: ObservedActivityType }) => void;
}

// ─── ExternalLayerPanel ───────────────────────────────────────────────────────

interface ExternalLayerPanelProps {
  externalLayer: ReturnType<typeof useExternalAggregates>;
  t: ReturnType<typeof useI18n>['t'];
}

function ExternalLayerPanel({ externalLayer, t }: ExternalLayerPanelProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute top-3 right-14 z-10">
      {/* Toggle button */}
      <button
        onClick={() => setOpen(p => !p)}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium shadow transition-colors ${
          externalLayer.isEnabled
            ? 'bg-blue-600 text-white'
            : 'bg-slate-900/90 backdrop-blur-sm text-slate-300 hover:text-slate-100'
        }`}
        title={t.map.externalLayerHint}
      >
        <span>🌐</span>
        <span className="hidden sm:inline">{t.map.externalLayer}</span>
        {externalLayer.isLoading && (
          <span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin ml-0.5" />
        )}
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute top-full right-0 mt-1 w-60 bg-slate-900/95 backdrop-blur-sm rounded-xl shadow-xl p-3 text-xs text-slate-300 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-medium text-slate-100">{t.map.externalLayer}</span>
            <button
              onClick={() => externalLayer.toggleEnabled()}
              className={`relative inline-flex h-4 w-8 items-center rounded-full transition-colors ${
                externalLayer.isEnabled ? 'bg-blue-600' : 'bg-slate-600'
              }`}
              aria-label={t.map.externalLayer}
            >
              <span
                className={`inline-block h-3 w-3 rounded-full bg-white shadow transition-transform ${
                  externalLayer.isEnabled ? 'translate-x-4' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          <p className="text-slate-400 text-[11px]">{t.map.externalLayerHint}</p>

          <div className="border-t border-slate-700 pt-2 space-y-1.5">
            {externalLayer.feedConfigs.length === 0 ? (
              <p className="text-slate-500 italic">{t.map.noExternalSources}</p>
            ) : (
              externalLayer.feedConfigs.map(feed => (
                <div key={feed.url} className="flex items-center justify-between gap-2">
                  <span className="truncate text-slate-300">{feed.label}</span>
                  <button
                    onClick={() => externalLayer.toggleFeed(feed.url)}
                    className={`flex-shrink-0 relative inline-flex h-3.5 w-7 items-center rounded-full transition-colors ${
                      feed.enabled ? 'bg-blue-600' : 'bg-slate-600'
                    }`}
                    aria-label={feed.label}
                  >
                    <span
                      className={`inline-block h-2.5 w-2.5 rounded-full bg-white shadow transition-transform ${
                        feed.enabled ? 'translate-x-3.5' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Verification badge ────────────────────────────────────────────────────────

interface VerifiedBadgeProps {
  verifiedBy: null | 'community' | 'ngo' | undefined;
  t: ReturnType<typeof useI18n>['t'];
}

function VerifiedBadge({ verifiedBy, t }: VerifiedBadgeProps) {
  if (verifiedBy === 'ngo') {
    return (
      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-green-900/60 text-green-300">
        ✓ {t.map.ngoVerified}
      </span>
    );
  }
  if (verifiedBy === 'community') {
    return (
      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-blue-900/60 text-blue-300">
        ✓ {t.map.communityVerified}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-700/60 text-slate-400">
      {t.map.unverified}
    </span>
  );
}

// ─── MapScreen ─────────────────────────────────────────────────────────────────

const MapScreen: React.FC<MapScreenProps> = ({ geoProps, onNavigateToReport }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const centeredRef = useRef(false);
  const { aggregates, isLoading } = useReports();
  const { rawCoords } = geoProps;
  const [selectedCell, setSelectedCell] = useState<CellAggregate | null>(null);
  const [quickReportOpen, setQuickReportOpen] = useState(false);
  const { settings } = useUserSettings();
  const { t } = useI18n(settings.locale);
  const timeline = useTimelineFilter(aggregates);
  const externalLayer = useExternalAggregates();

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
      // ── Lokale Zellen ───────────────────────────────────────────────────────
      map.current!.addSource('cells', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] },
      });

      map.current!.addLayer({
        id: 'cells-fill',
        type: 'fill',
        source: 'cells',
        paint: {
          'fill-color': ['get', 'color'],
          'fill-opacity': 0.45,
        },
      });

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

      // ── Externe Zellen ───────────────────────────────────────────────────────
      map.current!.addSource('cells-external', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] },
      });

      // Externer Layer — gedämpft, gestrichelt zur Unterscheidung
      map.current!.addLayer({
        id: 'cells-external-fill',
        type: 'fill',
        source: 'cells-external',
        paint: {
          'fill-color': ['get', 'color'],
          'fill-opacity': 0.25,        // halbe Deckkraft gegenüber lokalen
        },
      });

      map.current!.addLayer({
        id: 'cells-external-outline',
        type: 'line',
        source: 'cells-external',
        paint: {
          'line-color': ['get', 'color'],
          'line-width': 1.5,
          'line-opacity': 0.6,
          'line-dasharray': [2, 2],    // gestrichelter Rand → visuell unterscheidbar
        },
      });

      map.current!.on('click', 'cells-external-fill', e => {
        const feature = e.features?.[0];
        if (!feature) return;
        const props = feature.properties as CellAggregate & { color: string };
        setSelectedCell(props);
      });

      map.current!.on('mouseenter', 'cells-external-fill', () => {
        if (map.current) map.current.getCanvas().style.cursor = 'pointer';
      });
      map.current!.on('mouseleave', 'cells-external-fill', () => {
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

  /** Rendert lokale Aggregates auf die Karte. */
  const renderAggregates = useCallback((aggs: typeof aggregates) => {
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

  /** Rendert externe Aggregates auf den zweiten Layer. */
  const renderExternalAggregates = useCallback((aggs: CellAggregate[]) => {
    const source = map.current?.getSource('cells-external') as maplibregl.GeoJSONSource | undefined;
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

  // BUG-02 fix: wenn Style noch lädt, Aggregates in 'load'-Event nachrendern
  useEffect(() => {
    if (!map.current) return;
    if (map.current.isStyleLoaded()) {
      renderAggregates(timeline.filteredAggregates);
    } else {
      const onLoad = () => renderAggregates(timeline.filteredAggregates);
      map.current.once('load', onLoad);
      return () => { map.current?.off('load', onLoad); };
    }
  }, [renderAggregates, timeline.filteredAggregates]);

  // Externen Layer aktualisieren
  useEffect(() => {
    if (!map.current) return;

    const update = () => {
      if (!externalLayer.isEnabled) {
        const src = map.current?.getSource('cells-external') as maplibregl.GeoJSONSource | undefined;
        src?.setData({ type: 'FeatureCollection', features: [] });
        return;
      }
      renderExternalAggregates(externalLayer.aggregates);
    };

    if (map.current.isStyleLoaded()) {
      update();
    } else {
      map.current.once('load', update);
    }
  }, [externalLayer.aggregates, externalLayer.isEnabled, renderExternalAggregates]);

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
        {timeline.filteredAggregates.length > 0 && (
          <div className="pt-1.5 border-t border-slate-700 text-slate-400">
            {timeline.filteredAggregates.length} aktive Zellen
          </div>
        )}
      </div>

      {/* Externer Layer Toggle */}
      <ExternalLayerPanel externalLayer={externalLayer} t={t} />

      <TimelineSlider timeline={timeline} />

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

          {/* Externe Quelle — Hinweis-Banner */}
          {selectedCell.source === 'external' && (
            <div className="mb-3 p-2 rounded-lg bg-amber-950/40 border border-amber-800/40 text-xs text-amber-300 space-y-1">
              <div className="font-medium">⚠ {t.map.externalSource}</div>
              <div className="text-amber-400/80">{t.map.externalSourceWarning}</div>
              <div className="flex items-center gap-2 pt-1">
                <VerifiedBadge verifiedBy={selectedCell.cerfVerifiedBy} t={t} />
              </div>
            </div>
          )}

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

      {/* FAB – nur sichtbar wenn kein Popup offen */}
      {!selectedCell && onNavigateToReport && (
        <button
          onClick={() => setQuickReportOpen(true)}
          className="absolute bottom-24 right-4 z-10 flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-sm font-semibold rounded-full shadow-lg transition-colors"
          aria-label={t.map.reportNow}
        >
          <span>📍</span>
          <span>{t.map.reportNow}</span>
        </button>
      )}

      {/* QuickReportSheet */}
      {quickReportOpen && onNavigateToReport && (
        <QuickReportSheet
          geoProps={geoProps}
          onClose={() => setQuickReportOpen(false)}
          onNavigateToReport={(prefill) => {
            setQuickReportOpen(false);
            onNavigateToReport(prefill);
          }}
        />
      )}
    </div>
  );
};

export default MapScreen;
