/**
 * Kiosk-spezifischer Map-Screen.
 * Nutzt dieselbe Logik wie apps/web, aber importiert ausschließlich
 * aus workspace-Paketen – keine cross-app relativen Pfade.
 */
import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { CellAggregate } from '@peopleseyes/core-model';
import { getCellBoundary } from '@peopleseyes/core-logic';
import { useKioskProfile } from '../hooks/useKioskProfile.js';

function scoreToColor(score: number): string {
  if (score >= 0.8) return '#E24B4A';
  if (score >= 0.5) return '#EF9F27';
  if (score >= 0.2) return '#1D9E75';
  return '#378ADD';
}

const KioskMapScreen: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const centeredRef = useRef(false);
  const [selectedCell, setSelectedCell] = useState<CellAggregate | null>(null);
  const { profile } = useKioskProfile();

  const center = profile?.mapCenter
    ? [profile.mapCenter.lng, profile.mapCenter.lat] as [number, number]
    : [10.0, 51.3] as [number, number];
  const zoom = profile?.mapCenter?.zoom ?? 7;

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
    });

    return () => { map.current?.remove(); map.current = null; };
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
