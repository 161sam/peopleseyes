import React, { useEffect } from 'react';
import { I18nManager, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text } from 'react-native';
import * as Updates from 'expo-updates';
import { isRtlLocale, detectLocale } from '@peopleseyes/core-i18n';
import { requestNotificationPermission } from './services/notification-service.js';

/**
 * RTL-Setup vor erstem Render: forceRTL + Neustart bei Locale-Wechsel.
 */
function applyRtlIfNeeded(): void {
  try {
    const locale = detectLocale();
    const shouldBeRtl = isRtlLocale(locale);
    if (shouldBeRtl !== I18nManager.isRTL) {
      I18nManager.forceRTL(shouldBeRtl);
      if (Platform.OS !== 'web') {
        void Updates.reloadAsync().catch(() => {
          console.warn('[RTL] Neustart für RTL-Layout erforderlich');
        });
      }
    }
  } catch {
    // detectLocale nutzt navigator.languages – auf RN per getLocales() ersetzen
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
  useEffect(() => {
    // Notification-Berechtigung sanft anfragen (kein Blocker)
    void requestNotificationPermission();
  }, []);

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
            name="Karte"
            component={MapScreen}
            options={{ tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>🗺</Text> }}
          />
          <Tab.Screen
            name="Melden"
            component={ReportScreen}
            options={{ tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>📍</Text> }}
          />
          <Tab.Screen
            name="Rechte"
            component={RightsScreen}
            options={{ tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>⚖️</Text> }}
          />
          <Tab.Screen
            name="Beweise"
            component={EvidenceScreen}
            options={{ tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>🎥</Text> }}
          />
          <Tab.Screen
            name="Einstellungen"
            component={SettingsScreen}
            options={{ tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>⚙️</Text> }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
