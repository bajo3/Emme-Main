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
          tabBarInactiveTintColor: '#999',
          tabBarStyle: {
            borderTopWidth: 0.5,
            borderTopColor: '#ddd',
          },
        }}
      >
        {/* TABS VISIBLES */}
        <Tabs.Screen
          name="index"
          options={{
            title: 'Hoy',
            tabBarLabel: 'Hoy',
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
          }}
        />
        <Tabs.Screen
          name="services/index"
          options={{
            title: 'Servicios',
            tabBarLabel: 'Servicios',
          }}
        />
        <Tabs.Screen
          name="reports/index"
          options={{
            title: 'Reportes',
            tabBarLabel: 'Reportes',
          }}
        />

        {/* RUTAS OCULTAS (siguen existiendo, pero no aparecen como tab) */}
        <Tabs.Screen
          name="clients/new"
          options={{ href: null }}
        />
        <Tabs.Screen
          name="clients/[id]"
          options={{ href: null }}
        />
        <Tabs.Screen
          name="services/new"
          options={{ href: null }}
        />
        <Tabs.Screen
          name="services/[id]"
          options={{ href: null }}
        />
        <Tabs.Screen
          name="appointments/new"
          options={{ href: null }}
        />
        <Tabs.Screen
          name="appointments/[id]"
          options={{ href: null }}
        />
        <Tabs.Screen
          name="settings/index"
          options={{ href: null }}
        />
      </Tabs>
    </SafeAreaProvider>
  )
}
