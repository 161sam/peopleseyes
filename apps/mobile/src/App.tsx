import React, { useEffect, useState } from 'react';
import { I18nManager, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text } from 'react-native';
import * as Updates from 'expo-updates';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocales } from 'expo-localization';
import { isRtlLocale, getTranslations } from '@peopleseyes/core-i18n';
import type { SupportedLocale } from '@peopleseyes/core-model';
import { requestNotificationPermission } from './services/notification-service.js';

/**
 * RTL-Setup vor erstem Render: forceRTL + Neustart bei Locale-Wechsel.
 */
function applyRtlIfNeeded(): void {
  try {
    const locales = getLocales();
    const tag = locales[0]?.languageTag ?? 'de';
    const lang = (tag.split('-')[0] ?? 'de') as SupportedLocale;
    const shouldBeRtl = isRtlLocale(lang);
    if (shouldBeRtl !== I18nManager.isRTL) {
      I18nManager.forceRTL(shouldBeRtl);
      if (Platform.OS !== 'web') {
        void Updates.reloadAsync().catch(() => {
          console.warn('[RTL] Neustart für RTL-Layout erforderlich');
        });
      }
    }
  } catch {
    // getLocales() nicht verfügbar – RTL bleibt deaktiviert
  }
}

applyRtlIfNeeded();

// Pages – alle lazy importiert für schnelleres Startup
import { MapScreen, ReportScreen, RightsScreen, EvidenceScreen, SettingsScreen } from './pages/index.js';

const Tab = createBottomTabNavigator();

const DARK = {
  background: '#0f172a',
  card: '#0f172a',
  border: '#1e293b',
  text: '#f1f5f9',
  notification: '#3b82f6',
  primary: '#3b82f6',
};

export default function App() {
  const [locale, setLocale] = useState<SupportedLocale>('de');

  useEffect(() => {
    // Notification-Berechtigung sanft anfragen (kein Blocker)
    void requestNotificationPermission();

    // Locale aus AsyncStorage laden (gleicher Key wie useSettings in screens.tsx)
    void AsyncStorage.getItem('pe:locale').then(stored => {
      if (stored) setLocale(stored as SupportedLocale);
    }).catch(() => {/* Defaults behalten */});
  }, []);

  const t = getTranslations(locale);

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={{ dark: true, colors: DARK, fonts: undefined as never }}>
        <StatusBar style="light" backgroundColor="#0f172a" />
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: { backgroundColor: '#0f172a', borderTopColor: '#1e293b' },
            tabBarActiveTintColor: '#60a5fa',
            tabBarInactiveTintColor: '#64748b',
            tabBarLabelStyle: { fontSize: 10 },
          }}
        >
          <Tab.Screen
            name="Map"
            component={MapScreen}
            options={{
              tabBarLabel: t.nav.map,
              tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>🗺</Text>,
            }}
          />
          <Tab.Screen
            name="Report"
            component={ReportScreen}
            options={{
              tabBarLabel: t.nav.report,
              tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>📍</Text>,
            }}
          />
          <Tab.Screen
            name="Rights"
            component={RightsScreen}
            options={{
              tabBarLabel: t.nav.rights,
              tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>⚖️</Text>,
            }}
          />
          <Tab.Screen
            name="Evidence"
            component={EvidenceScreen}
            options={{
              tabBarLabel: t.nav.evidence,
              tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>🎥</Text>,
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              tabBarLabel: t.nav.settings,
              tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>⚙️</Text>,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
