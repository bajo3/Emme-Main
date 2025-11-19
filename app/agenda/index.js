import React, { useEffect, useState } from 'react'
import {
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
} from 'react-native'
import { useRouter } from 'expo-router'
import Screen from '../../components/ui/Screen'
import SectionTitle from '../../components/ui/SectionTitle'
import Spacer from '../../components/ui/Spacer'
import Card from '../../components/ui/Card'
import { supabase } from '../../lib/supabase'

function formatTime(t) {
  if (!t) return ''
  return t.slice(0, 5)
}

function getStatusColor(status) {
  switch (status) {
    case 'confirmed':
      return '#0277BD'
    case 'done':
      return '#2E7D32'
    case 'cancelled':
      return '#E53935'
    default:
      return '#FF8F00' // pending
  }
}

function getStatusLabel(status) {
  switch (status) {
    case 'confirmed':
      return 'Confirmado'
    case 'done':
      return 'Realizado'
    case 'cancelled':
      return 'Cancelado'
    default:
      return 'Pendiente'
  }
}

export default function AgendaScreen() {
  const router = useRouter()
  const today = new Date().toISOString().slice(0, 10)

  const [date, setDate] = useState(today)
  const [loading, setLoading] = useState(false)
  const [appointments, setAppointments] = useState([])

  const loadAppointments = async () => {
    setLoading(true)

    const { data, error } = await supabase
      .from('appointments')
      .select(
        `
          id,
          date,
          start_time,
          end_time,
          status,
          service_name,
          clients ( id, name )
        `
      )
      .eq('date', date)
      .order('start_time', { ascending: true })

    if (error) {
      console.error('Error cargando agenda', error)
      setAppointments([])
      setLoading(false)
      return
    }

    setAppointments(data || [])
    setLoading(false)
  }

  useEffect(() => {
    loadAppointments()
  }, [date])

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => router.push(`/appointments/${item.id}`)}
      style={{ marginBottom: 10 }}
    >
      <Card>
        <Text style={styles.time}>
          {formatTime(item.start_time)}
          {item.end_time ? ` - ${formatTime(item.end_time)}` : ''}
        </Text>

        <Spacer size={4} />

        <Text style={styles.client}>
          {item.clients?.name || 'Sin cliente'}
        </Text>

        <Spacer size={4} />

        <Text style={styles.service}>{item.service_name}</Text>

        <Spacer size={6} />

        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status) },
          ]}
        >
          <Text style={styles.statusText}>
            {getStatusLabel(item.status)}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  )

  return (
    <Screen>
      <SectionTitle>Agenda</SectionTitle>

      <Text style={styles.label}>Fecha</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
        placeholder="YYYY-MM-DD"
      />

      <Spacer size={10} />

      {loading ? (
        <>
          <ActivityIndicator />
          <Spacer size={10} />
          <Text>Cargando agenda...</Text>
        </>
      ) : appointments.length === 0 ? (
        <Text>No hay turnos en esta fecha.</Text>
      ) : (
        <FlatList
          data={appointments}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </Screen>
  )
}

const styles = StyleSheet.create({
  label: {
    fontSize: 13,
    color: '#616161',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 8,
    backgroundColor: '#FAFAFA',
    fontSize: 14,
  },
  time: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
  },
  client: {
    fontSize: 14,
    color: '#424242',
  },
  service: {
    fontSize: 13,
    color: '#616161',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 12,
  },
})
