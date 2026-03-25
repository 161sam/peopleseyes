import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Polygon, Region } from 'react-native-maps';
import type { CellAggregate, GeoBoundingBox } from '@peopleseyes/core-model';
import { getCellBoundary, scoreToColor } from '@peopleseyes/core-logic';
import { getTranslations } from '@peopleseyes/core-i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { SupportedLocale } from '@peopleseyes/core-model';
import { useNativeReports } from '../hooks/useNativeReports.js';
import { useNativeLocation } from '../hooks/useNativeLocation.js';
import { mobileP2pSync } from '../services/mobile-p2p-sync.js';


const MapScreen: React.FC = () => {
  const { aggregates, isLoading, syncStatus } = useNativeReports();
  const { rawCoords } = useNativeLocation();
  const [locale, setLocale] = useState<SupportedLocale>('de');
  const t = getTranslations(locale);
  const [selectedCell, setSelectedCell] = useState<CellAggregate | null>(null);

  // Locale aus AsyncStorage laden (konsistent mit SettingsScreen)
  useEffect(() => {
    void AsyncStorage.getItem('pe:locale').then(v => {
      if (v) setLocale(v as SupportedLocale);
    });
  }, []);

  const onRegionChange = useCallback((region: Region) => {
    const bbox: GeoBoundingBox = {
      north: region.latitude + region.latitudeDelta / 2,
      south: region.latitude - region.latitudeDelta / 2,
      east: region.longitude + region.longitudeDelta / 2,
      west: region.longitude - region.longitudeDelta / 2,
    };
    mobileP2pSync.setViewport(bbox);
  }, []);

  const initialRegion = rawCoords
    ? { latitude: rawCoords.lat, longitude: rawCoords.lng, latitudeDelta: 0.1, longitudeDelta: 0.1 }
    : { latitude: 51.3, longitude: 10.0, latitudeDelta: 8, longitudeDelta: 8 };

  return (
    <View style={styles.fill}>
      <MapView
        style={styles.fill}
        initialRegion={initialRegion}
        onRegionChangeComplete={onRegionChange}
        mapType="standard"
        userInterfaceStyle="dark"
        showsUserLocation={false} // Kein Blue Dot – Privacy
      >
        {aggregates.map(agg => {
          const boundary = getCellBoundary(agg.cellId).map(([lng, lat]) => ({
            latitude: lat,
            longitude: lng,
          }));
          const color = scoreToColor(agg.aggregateScore);
          return (
            <Polygon
              key={agg.cellId}
              coordinates={boundary}
              fillColor={`${color}70`}
              strokeColor={color}
              strokeWidth={1.5}
              tappable
              onPress={() => setSelectedCell(agg)}
            />
          );
        })}
      </MapView>

      {/* Sync-Status-Badge */}
      <View style={styles.syncBadge}>
        <View style={[styles.dot, syncStatus.connectedPeers > 0 ? styles.dotGreen : styles.dotGray]} />
        <Text style={styles.syncText}>
          {syncStatus.connectedPeers > 0
            ? `${syncStatus.connectedPeers} Peer${syncStatus.connectedPeers > 1 ? 's' : ''}`
            : 'Offline'}
        </Text>
      </View>

      {/* Zell-Detail */}
      {selectedCell && (
        <View style={styles.detailCard}>
          <View style={styles.detailHeader}>
            <Text style={styles.detailTitle}>Meldungen in diesem Bereich</Text>
            <TouchableOpacity onPress={() => setSelectedCell(null)}>
              <Text style={styles.closeBtn}>✕</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.detailGrid}>
            <Text style={styles.detailLabel}>Meldungen</Text>
            <Text style={styles.detailValue}>{selectedCell.reportCount}</Text>
            <Text style={styles.detailLabel}>{t.report.authorityLabel}</Text>
            <Text style={styles.detailValue} numberOfLines={1}>{t.authority[selectedCell.dominantAuthorityCategory]}</Text>
            <Text style={styles.detailLabel}>{t.report.activityLabel}</Text>
            <Text style={styles.detailValue} numberOfLines={1}>{t.activity[selectedCell.dominantActivityType]}</Text>
            <Text style={styles.detailLabel}>{t.report.confidenceLabel}</Text>
            <Text style={styles.detailValue}>{Math.round(selectedCell.aggregateScore * 100)} %</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  fill: { flex: 1 },
  syncBadge: {
    position: 'absolute', top: 12, left: 12,
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: 'rgba(15,23,42,0.85)', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6,
  },
  dot: { width: 7, height: 7, borderRadius: 4 },
  dotGreen: { backgroundColor: '#22c55e' },
  dotGray: { backgroundColor: '#64748b' },
  syncText: { color: '#94a3b8', fontSize: 11 },
  detailCard: {
    position: 'absolute', bottom: 16, left: 12, right: 12,
    backgroundColor: 'rgba(15,23,42,0.95)', borderRadius: 16, padding: 16,
  },
  detailHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  detailTitle: { color: '#f1f5f9', fontSize: 14, fontWeight: '500' },
  closeBtn: { color: '#64748b', fontSize: 18, lineHeight: 18 },
  detailGrid: { flexDirection: 'row', flexWrap: 'wrap', rowGap: 4 },
  detailLabel: { width: '40%', color: '#64748b', fontSize: 12 },
  detailValue: { width: '60%', color: '#e2e8f0', fontSize: 12 },
});

export default MapScreen;
