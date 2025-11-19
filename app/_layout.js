// app/_layout.js
import { Tabs } from 'expo-router'
import { useColorScheme } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function RootLayout() {
  const colorScheme = useColorScheme()

  const isDark = colorScheme === 'dark'

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
        <Tabs.Screen
          name="index"
          options={{
            title: 'Hoy',
            tabBarLabel: 'Agenda',
          }}
        />
        <Tabs.Screen
          name="agenda/index"
          options={{
            title: 'Agenda',
            tabBarLabel: 'Calendario',
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
      </Tabs>
    </SafeAreaProvider>
  )
}
