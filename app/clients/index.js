// app/clients/index.js
import React, { useEffect, useState, useCallback } from 'react'

import {
  Text,
  Button,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { useRouter, useFocusEffect } from 'expo-router'
import Screen from '../../components/ui/Screen'
import SectionTitle from '../../components/ui/SectionTitle'
import Spacer from '../../components/ui/Spacer'
import Card from '../../components/ui/Card'
import { supabase } from '../../lib/supabase'

export default function ClientsScreen() {
  const router = useRouter()
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const loadClients = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('name', { ascending: true })

    if (error) {
      console.error('Error al cargar clientes', error)
    } else {
      setClients(data || [])
    }

    setLoading(false)
  }

  useFocusEffect(
    useCallback(() => {
      loadClients()
    }, [])
  )

  const onRefresh = async () => {
    setRefreshing(true)
    await loadClients()
    setRefreshing(false)
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => router.push(`/clients/${item.id}`)}
      style={{ marginBottom: 10 }}
    >
      <Card>
        <Text style={styles.name}>{item.name}</Text>
        {item.phone ? <Text style={styles.phone}>{item.phone}</Text> : null}
        {item.instagram ? <Text style={styles.ig}>@{item.instagram}</Text> : null}
        {item.notes ? (
          <>
            <Spacer size={4} />
            <Text style={styles.notes} numberOfLines={2}>
              {item.notes}
            </Text>
          </>
        ) : null}
      </Card>
    </TouchableOpacity>
  )

  return (
    <Screen scroll={false}>
      <SectionTitle
        right={<Button title="Nuevo" onPress={() => router.push('/clients/new')} />}
      >
        Clientes
      </SectionTitle>

      <Spacer />

      {loading && clients.length === 0 ? (
        <ActivityIndicator />
      ) : clients.length === 0 ? (
        <Text>No hay clientes cargados todavía.</Text>
      ) : (
        <FlatList
          data={clients}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#3F51B5" />
          }
        />
      )}
    </Screen>
  )
}

const styles = StyleSheet.create({
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
  },
  phone: {
    fontSize: 14,
    color: '#424242',
  },
  ig: {
    fontSize: 13,
    color: '#7B1FA2',
  },
  notes: {
    fontSize: 12,
    color: '#757575',
  },
})
