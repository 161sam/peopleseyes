import React, { useState, useCallback, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Modal,
  ScrollView, TouchableWithoutFeedback,
} from 'react-native';
import MapView, { Polygon, Region } from 'react-native-maps';
import {
  AuthorityCategory, AuthorityVisibility,
  ObservedActivityType, ObservationConfidence,
  H3Resolution,
} from '@peopleseyes/core-model';
import type { CellAggregate, GeoBoundingBox } from '@peopleseyes/core-model';
import { getCellBoundary, scoreToColor } from '@peopleseyes/core-logic';
import { createReport } from '@peopleseyes/core-logic';
import { getTranslations } from '@peopleseyes/core-i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { SupportedLocale } from '@peopleseyes/core-model';
import { useNativeReports } from '../hooks/useNativeReports.js';
import { useNativeLocation } from '../hooks/useNativeLocation.js';
import { mobileP2pSync } from '../services/mobile-p2p-sync.js';

// ─── QuickReport-Typen ────────────────────────────────────────────────────────

type AuthorityGroup = 'federal' | 'state' | 'immigration' | 'frontex';

const GROUP_TO_CATEGORY: Record<AuthorityGroup, AuthorityCategory> = {
  federal:     AuthorityCategory.BundespolizeiBahn,
  state:       AuthorityCategory.LandespolizeiAllgemein,
  immigration: AuthorityCategory.AuslaenderbehördeUnterkuenfte,
  frontex:     AuthorityCategory.FrontexPatrouille,
};

const GROUP_ICONS: Record<AuthorityGroup, string> = {
  federal:     '🚔',
  state:       '🏛️',
  immigration: '📋',
  frontex:     '🇪🇺',
};

const GROUPS: AuthorityGroup[] = ['federal', 'state', 'immigration', 'frontex'];
const ALL_ACTIVITIES: ObservedActivityType[] = Object.values(ObservedActivityType);

// ─── MapScreen ────────────────────────────────────────────────────────────────

const MapScreen: React.FC = () => {
  const { aggregates, isLoading, syncStatus, addReport } = useNativeReports();
  const { rawCoords } = useNativeLocation();
  const [locale, setLocale] = useState<SupportedLocale>('de');
  const t = getTranslations(locale);
  const [selectedCell, setSelectedCell] = useState<CellAggregate | null>(null);

  // QuickReport Modal
  const [quickReportVisible, setQuickReportVisible] = useState(false);
  const [quickStep, setQuickStep] = useState<1 | 2>(1);
  const [quickGroup, setQuickGroup] = useState<AuthorityGroup | null>(null);
  const [quickActivity, setQuickActivity] = useState<ObservedActivityType | null>(null);
  const [quickSubmitting, setQuickSubmitting] = useState(false);
  const [quickSuccess, setQuickSuccess] = useState(false);

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

  const openQuickReport = () => {
    setQuickStep(1);
    setQuickGroup(null);
    setQuickActivity(null);
    setQuickSuccess(false);
    setQuickReportVisible(true);
  };

  const closeQuickReport = () => {
    setQuickReportVisible(false);
  };

  const handleGroupSelect = (group: AuthorityGroup) => {
    setQuickGroup(group);
    setQuickStep(2);
  };

  const handleQuickSubmit = async () => {
    if (!quickGroup || !quickActivity || quickSubmitting) return;
    const authority = GROUP_TO_CATEGORY[quickGroup];
    const lat = rawCoords?.lat ?? 51.3;
    const lng = rawCoords?.lng ?? 10.0;

    setQuickSubmitting(true);
    try {
      const report = createReport({
        lat,
        lng,
        authorityCategory: authority,
        authorityVisibility: AuthorityVisibility.EindeutigErkennbar,
        activityType: quickActivity,
        confidence: ObservationConfidence.Direkt,
        resolution: H3Resolution.Viertel,
      });
      await addReport(report);
      setQuickSuccess(true);
      setTimeout(() => {
        setQuickSuccess(false);
        closeQuickReport();
      }, 2000);
    } catch {
      // Fehler stilll – Nutzer kann erneut versuchen
    } finally {
      setQuickSubmitting(false);
    }
  };

  function groupLabel(group: AuthorityGroup): string {
    switch (group) {
      case 'federal':     return t.report.groupFederal;
      case 'state':       return t.report.groupState;
      case 'immigration': return t.report.groupImmigration;
      case 'frontex':     return t.report.groupFrontex;
    }
  }

  return (
    <View style={styles.fill}>
      <MapView
        style={styles.fill}
        initialRegion={initialRegion}
        onRegionChangeComplete={onRegionChange}
        mapType="standard"
        userInterfaceStyle="dark"
        showsUserLocation={false}
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

      {/* FAB – nur sichtbar wenn kein Zell-Popup offen */}
      {!selectedCell && (
        <TouchableOpacity style={styles.fab} onPress={openQuickReport} activeOpacity={0.8}>
          <Text style={styles.fabText}>📍 {t.map.reportNow}</Text>
        </TouchableOpacity>
      )}

      {/* QuickReport Modal */}
      <Modal
        visible={quickReportVisible}
        transparent
        animationType="slide"
        onRequestClose={closeQuickReport}
      >
        <TouchableWithoutFeedback onPress={closeQuickReport}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>

        <View style={styles.sheet}>
          {/* Handle bar */}
          <View style={styles.handleBar} />

          <ScrollView
            style={styles.sheetScroll}
            contentContainerStyle={styles.sheetContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <View style={styles.sheetHeader}>
              <View>
                <Text style={styles.sheetTitle}>{t.map.quickReportTitle}</Text>
                <Text style={styles.sheetSubtitle}>{t.map.quickReportSubtitle}</Text>
              </View>
              <TouchableOpacity onPress={closeQuickReport} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Text style={styles.sheetClose}>×</Text>
              </TouchableOpacity>
            </View>

            {/* Erfolgs-Feedback */}
            {quickSuccess && (
              <View style={styles.successBox}>
                <Text style={styles.successText}>✓ {t.map.quickReportSuccess}</Text>
              </View>
            )}

            {/* Schritt 1: Gruppe */}
            {quickStep === 1 && !quickSuccess && (
              <>
                <Text style={styles.stepLabel}>{t.report.step.authority}</Text>
                <View style={styles.groupGrid}>
                  {GROUPS.map(group => (
                    <TouchableOpacity
                      key={group}
                      style={styles.groupTile}
                      onPress={() => handleGroupSelect(group)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.groupIcon}>{GROUP_ICONS[group]}</Text>
                      <Text style={styles.groupLabel}>{groupLabel(group)}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}

            {/* Schritt 2: Aktivität */}
            {quickStep === 2 && !quickSuccess && (
              <>
                <View style={styles.backRow}>
                  <TouchableOpacity
                    onPress={() => { setQuickStep(1); setQuickActivity(null); }}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <Text style={styles.backBtn}>← {t.common.back}</Text>
                  </TouchableOpacity>
                  <Text style={styles.stepLabel}>{t.report.step.activity}</Text>
                </View>

                <View style={styles.activityGrid}>
                  {ALL_ACTIVITIES.map(act => (
                    <TouchableOpacity
                      key={act}
                      onPress={() => setQuickActivity(quickActivity === act ? null : act)}
                      style={[
                        styles.activityChip,
                        quickActivity === act && styles.activityChipActive,
                      ]}
                      activeOpacity={0.7}
                    >
                      <Text style={[
                        styles.activityChipText,
                        quickActivity === act && styles.activityChipTextActive,
                      ]}>
                        {t.activity[act]}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <TouchableOpacity
                  style={[styles.submitBtn, (!quickActivity || quickSubmitting) && styles.submitBtnDisabled]}
                  onPress={() => void handleQuickSubmit()}
                  disabled={!quickActivity || quickSubmitting}
                  activeOpacity={0.8}
                >
                  <Text style={styles.submitBtnText}>
                    {quickSubmitting ? t.common.loading : t.report.submitButton}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  fill: { flex: 1 },

  // Map overlays
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
    position: 'absolute', bottom: 96, left: 12, right: 12,
    backgroundColor: 'rgba(15,23,42,0.95)', borderRadius: 16, padding: 16,
  },
  detailHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  detailTitle: { color: '#f1f5f9', fontSize: 14, fontWeight: '500' },
  closeBtn: { color: '#64748b', fontSize: 18, lineHeight: 18 },
  detailGrid: { flexDirection: 'row', flexWrap: 'wrap', rowGap: 4 },
  detailLabel: { width: '40%', color: '#64748b', fontSize: 12 },
  detailValue: { width: '60%', color: '#e2e8f0', fontSize: 12 },

  // FAB
  fab: {
    position: 'absolute', bottom: 96, right: 16,
    backgroundColor: '#2563eb',
    borderRadius: 24, paddingHorizontal: 16, paddingVertical: 10,
    shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 6, shadowOffset: { width: 0, height: 2 },
    elevation: 6,
  },
  fabText: { color: '#ffffff', fontSize: 14, fontWeight: '600' },

  // Modal backdrop
  backdrop: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  // Sheet
  sheet: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    maxHeight: '70%',
    backgroundColor: '#0f172a',
    borderTopLeftRadius: 20, borderTopRightRadius: 20,
  },
  handleBar: {
    alignSelf: 'center', width: 40, height: 4,
    backgroundColor: '#334155', borderRadius: 2, marginTop: 12, marginBottom: 4,
  },
  sheetScroll: { flexGrow: 0 },
  sheetContent: { paddingHorizontal: 16, paddingBottom: 32 },
  sheetHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingVertical: 12 },
  sheetTitle: { color: '#f1f5f9', fontSize: 16, fontWeight: '600', marginBottom: 2 },
  sheetSubtitle: { color: '#64748b', fontSize: 12 },
  sheetClose: { color: '#64748b', fontSize: 24, lineHeight: 24 },

  // Success
  successBox: {
    backgroundColor: '#052e16', borderRadius: 10, padding: 14, alignItems: 'center', marginBottom: 12,
  },
  successText: { color: '#4ade80', fontSize: 14, fontWeight: '600' },

  // Group tiles
  stepLabel: { color: '#cbd5e1', fontSize: 14, fontWeight: '500', marginBottom: 12 },
  groupGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 8 },
  groupTile: {
    width: '47%', backgroundColor: '#1e293b',
    borderRadius: 12, padding: 16, alignItems: 'center', gap: 6,
    borderWidth: 1, borderColor: '#334155',
  },
  groupIcon: { fontSize: 24 },
  groupLabel: { color: '#e2e8f0', fontSize: 12, fontWeight: '500', textAlign: 'center' },

  // Back row
  backRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  backBtn: { color: '#94a3b8', fontSize: 14 },

  // Activity chips
  activityGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  activityChip: {
    paddingHorizontal: 12, paddingVertical: 8,
    borderRadius: 8, borderWidth: 1, borderColor: '#334155',
    backgroundColor: '#1e293b',
  },
  activityChipActive: { borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.15)' },
  activityChipText: { color: '#94a3b8', fontSize: 12 },
  activityChipTextActive: { color: '#93c5fd' },

  // Submit
  submitBtn: {
    backgroundColor: '#2563eb', borderRadius: 12,
    paddingVertical: 14, alignItems: 'center',
  },
  submitBtnDisabled: { backgroundColor: '#1e293b' },
  submitBtnText: { color: '#ffffff', fontSize: 15, fontWeight: '600' },
});

export default MapScreen;
