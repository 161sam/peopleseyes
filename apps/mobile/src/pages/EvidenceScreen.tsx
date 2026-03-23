import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Audio } from 'expo-av';
import type { Evidence } from '@peopleseyes/core-model';
import {
  processPhoto,
  processMediaFile,
  deleteEvidenceFile,
  formatBytes,
} from '../services/camera-service.js';
import {
  IS_IOS,
  requestPhotoLibraryPermission,
  normalizeImageFormat,
} from '../../ios-support.js';

type RecordingState = 'idle' | 'recording-video' | 'recording-audio' | 'processing';

const EvidenceScreen: React.FC = () => {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [evidenceList, setEvidenceList] = useState<(Evidence & { id: string })[]>([]);
  const [recordingState, setRecordingState] = useState<RecordingState>('idle');
  const [showCamera, setShowCamera] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  const audioRef = useRef<Audio.Recording | null>(null);

  const addEvidence = useCallback((ev: Omit<Evidence, 'id'>) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    setEvidenceList(prev => [{ ...ev, id }, ...prev]);
  }, []);

  // ── Foto aufnehmen ────────────────────────────────────────────────────────

  const takePhoto = async () => {
    if (!cameraRef.current) return;
    // Auf iOS: Photo-Library-Berechtigung prüfen (für Speichern)
    if (IS_IOS) await requestPhotoLibraryPermission();
    setRecordingState('processing');
    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.9,
        skipProcessing: false,
      });
      if (!photo) throw new Error('Kein Foto erhalten');

      // Auf iOS: HEIC → JPEG normalisieren bevor EXIF-Strip
      const normalizedUri = await normalizeImageFormat(photo.uri);
      const result = await processPhoto(normalizedUri);
      addEvidence(result.evidence);
      setShowCamera(false);
    } catch (err) {
      Alert.alert('Fehler', err instanceof Error ? err.message : 'Foto fehlgeschlagen');
    } finally {
      setRecordingState('idle');
    }
  };

  // ── Video aufnehmen ───────────────────────────────────────────────────────

  const startVideo = async () => {
    if (!cameraRef.current) return;
    setRecordingState('recording-video');
    try {
      const video = await cameraRef.current.recordAsync({ maxDuration: 120 });
      if (!video) return;
      setRecordingState('processing');
      const result = await processMediaFile(video.uri, 'video');
      addEvidence(result.evidence);
      setShowCamera(false);
    } catch (err) {
      Alert.alert('Fehler', err instanceof Error ? err.message : 'Video fehlgeschlagen');
    } finally {
      setRecordingState('idle');
    }
  };

  const stopVideo = () => {
    cameraRef.current?.stopRecording();
  };

  // ── Audio aufnehmen ───────────────────────────────────────────────────────

  const startAudio = async () => {
    const { granted } = await Audio.requestPermissionsAsync();
    if (!granted) {
      Alert.alert('Kein Zugriff', 'Mikrofon-Berechtigung erforderlich');
      return;
    }

    await Audio.setAudioModeAsync({ allowsRecordingIOS: true });
    const { recording } = await Audio.Recording.createAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY,
    );
    audioRef.current = recording;
    setRecordingState('recording-audio');
  };

  const stopAudio = async () => {
    if (!audioRef.current) return;
    setRecordingState('processing');
    try {
      await audioRef.current.stopAndUnloadAsync();
      const uri = audioRef.current.getURI();
      if (!uri) throw new Error('Keine Audio-URI');
      const result = await processMediaFile(uri, 'audio');
      addEvidence(result.evidence);
    } catch (err) {
      Alert.alert('Fehler', err instanceof Error ? err.message : 'Audio fehlgeschlagen');
    } finally {
      audioRef.current = null;
      setRecordingState('idle');
    }
  };

  // ── Löschen ───────────────────────────────────────────────────────────────

  const deleteEvidence = (ev: Evidence & { id: string }) => {
    Alert.alert('Löschen', 'Aufnahme endgültig löschen?', [
      { text: 'Abbrechen', style: 'cancel' },
      {
        text: 'Löschen',
        style: 'destructive',
        onPress: async () => {
          await deleteEvidenceFile(ev.localRef);
          setEvidenceList(prev => prev.filter(e => e.id !== ev.id));
        },
      },
    ]);
  };

  // ── Kamera-Ansicht ────────────────────────────────────────────────────────

  if (showCamera) {
    if (!cameraPermission?.granted) {
      return (
        <View style={styles.center}>
          <Text style={styles.muted}>Kamera-Berechtigung erforderlich</Text>
          <TouchableOpacity style={styles.btn} onPress={requestCameraPermission}>
            <Text style={styles.btnText}>Berechtigung anfragen</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.fill}>
        <CameraView ref={cameraRef} style={styles.fill} facing="back">
          <View style={styles.cameraControls}>
            <TouchableOpacity onPress={() => setShowCamera(false)} style={styles.cancelBtn}>
              <Text style={styles.cancelText}>✕ Abbrechen</Text>
            </TouchableOpacity>

            <View style={styles.cameraActions}>
              {recordingState === 'idle' && (
                <>
                  <TouchableOpacity style={styles.captureBtn} onPress={takePhoto}>
                    <Text style={styles.captureBtnText}>📷 Foto</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.captureBtn, styles.videoBtn]} onPress={startVideo}>
                    <Text style={styles.captureBtnText}>🎥 Video</Text>
                  </TouchableOpacity>
                </>
              )}
              {recordingState === 'recording-video' && (
                <TouchableOpacity style={[styles.captureBtn, styles.stopBtn]} onPress={stopVideo}>
                  <Text style={styles.captureBtnText}>⏹ Stopp</Text>
                </TouchableOpacity>
              )}
              {recordingState === 'processing' && (
                <ActivityIndicator color="#fff" size="large" />
              )}
            </View>
          </View>
        </CameraView>
        <Text style={styles.exifNote}>GPS-Daten werden automatisch entfernt</Text>
      </View>
    );
  }

  // ── Haupt-Ansicht ─────────────────────────────────────────────────────────

  return (
    <View style={styles.fill}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Beweissicherung</Text>
        <Text style={styles.subtitle}>
          GPS-Daten und Geräteinformationen werden automatisch aus allen Aufnahmen entfernt.
        </Text>

        {/* Aufnahme-Aktionen */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => setShowCamera(true)}
            disabled={recordingState !== 'idle'}
          >
            <Text style={styles.actionIcon}>📷</Text>
            <Text style={styles.actionLabel}>Foto / Video</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionBtn, recordingState === 'recording-audio' && styles.activeBtn]}
            onPress={recordingState === 'recording-audio' ? stopAudio : startAudio}
            disabled={recordingState === 'recording-video' || recordingState === 'processing'}
          >
            <Text style={styles.actionIcon}>
              {recordingState === 'recording-audio' ? '⏹' : '🎙'}
            </Text>
            <Text style={styles.actionLabel}>
              {recordingState === 'recording-audio' ? 'Stopp' : 'Audio'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Aufnahmen-Liste */}
        {evidenceList.length === 0 ? (
          <Text style={styles.empty}>Noch keine Aufnahmen gespeichert.</Text>
        ) : (
          evidenceList.map(ev => (
            <View key={ev.id} style={styles.evidenceRow}>
              <View style={styles.evidenceMeta}>
                <Text style={styles.evidenceType}>
                  {ev.mediaType === 'photo' ? '📷' : ev.mediaType === 'video' ? '🎥' : '🎙'}{' '}
                  {ev.mediaType}
                </Text>
                <Text style={styles.evidenceSize}>{formatBytes(ev.sizeBytes)}</Text>
                {ev.exifStripped && (
                  <Text style={styles.exifBadge}>EXIF entfernt</Text>
                )}
              </View>
              <TouchableOpacity onPress={() => deleteEvidence(ev)}>
                <Text style={styles.deleteBtn}>🗑</Text>
              </TouchableOpacity>
            </View>
          ))
        )}

        <Text style={styles.storageWarning}>
          Aufnahmen sind nur lokal auf deinem Gerät gespeichert. Sichere wichtige Aufnahmen
          an einem sicheren Ort.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  fill: { flex: 1, backgroundColor: '#0f172a' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0f172a', gap: 16 },
  container: { padding: 16, paddingBottom: 32 },
  title: { fontSize: 20, fontWeight: '500', color: '#f1f5f9', marginBottom: 6 },
  subtitle: { fontSize: 12, color: '#64748b', lineHeight: 18, marginBottom: 20 },
  muted: { color: '#64748b', fontSize: 14 },
  actionRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  actionBtn: {
    flex: 1, backgroundColor: '#1e293b', borderRadius: 12,
    padding: 20, alignItems: 'center', gap: 8,
    borderWidth: 1, borderColor: '#334155',
  },
  activeBtn: { borderColor: '#ef4444', backgroundColor: '#450a0a' },
  actionIcon: { fontSize: 28 },
  actionLabel: { fontSize: 13, color: '#94a3b8', fontWeight: '500' },
  evidenceRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#1e293b', borderRadius: 10, padding: 14, marginBottom: 8,
  },
  evidenceMeta: { flex: 1, gap: 4 },
  evidenceType: { color: '#e2e8f0', fontSize: 14 },
  evidenceSize: { color: '#64748b', fontSize: 12 },
  exifBadge: {
    fontSize: 10, color: '#34d399', backgroundColor: '#064e3b',
    paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, alignSelf: 'flex-start',
  },
  deleteBtn: { fontSize: 20, padding: 4 },
  empty: { color: '#475569', textAlign: 'center', marginVertical: 32 },
  storageWarning: {
    fontSize: 11, color: '#475569', lineHeight: 16,
    backgroundColor: '#1e293b', borderRadius: 10, padding: 12, marginTop: 16,
  },
  cameraControls: { flex: 1, justifyContent: 'space-between', padding: 16 },
  cancelBtn: { alignSelf: 'flex-start', backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 8, padding: 8 },
  cancelText: { color: '#fff', fontSize: 14 },
  cameraActions: { flexDirection: 'row', justifyContent: 'center', gap: 16, marginBottom: 32 },
  captureBtn: {
    backgroundColor: '#3b82f6', borderRadius: 12,
    paddingHorizontal: 24, paddingVertical: 14, alignItems: 'center',
  },
  videoBtn: { backgroundColor: '#dc2626' },
  stopBtn: { backgroundColor: '#f97316' },
  captureBtnText: { color: '#fff', fontSize: 16, fontWeight: '500' },
  exifNote: {
    color: '#34d399', fontSize: 11, textAlign: 'center',
    backgroundColor: '#0f172a', padding: 8,
  },
  btn: { backgroundColor: '#3b82f6', borderRadius: 10, paddingHorizontal: 24, paddingVertical: 12 },
  btnText: { color: '#fff', fontSize: 14, fontWeight: '500' },
});

export default EvidenceScreen;
