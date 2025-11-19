// app/_layout.js
import { Tabs } from 'expo-router'
import { useColorScheme } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'

export default function RootLayout() {
  const isDark = useColorScheme() === 'dark'

  return (
    <SafeAreaProvider>
      <Tabs
        screenOptions={{
          headerShown: true,
          tabBarActiveTintColor: isDark ? '#FFE082' : '#3F51B5',
          tabBarInactiveTintColor: isDark ? '#B0BEC5' : '#999999',
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '500',
          },
          tabBarStyle: {
            height: 64,
            paddingTop: 6,
            paddingBottom: 10,
            borderTopWidth: 0,
            backgroundColor: isDark ? '#121212' : '#FFFFFF',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.08,
            shadowRadius: 6,
            elevation: 8,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Hoy',
            tabBarLabel: 'Hoy',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="today-outline" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="agenda/index"
          options={{
            title: 'Agenda',
            tabBarLabel: 'Agenda',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar-outline" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="clients/index"
          options={{
            title: 'Clientes',
            tabBarLabel: 'Clientes',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="people-outline" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="services/index"
          options={{
            title: 'Servicios',
            tabBarLabel: 'Servicios',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="color-palette-outline" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="reports/index"
          options={{
            title: 'Reportes',
            tabBarLabel: 'Reportes',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="stats-chart-outline" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="settings/index"
          options={{
            tabBarButton: () => null, // ruta oculta
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  )
}
