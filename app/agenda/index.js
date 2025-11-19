// app/agenda/index.js
import React from 'react'
import { Text } from 'react-native'
import Screen from '../../components/ui/Screen'
import SectionTitle from '../../components/ui/SectionTitle'

export default function AgendaScreen() {
  return (
    <Screen>
      <SectionTitle>Agenda</SectionTitle>
      <Text>Acá vamos a poner la vista diaria y semanal con filtros.</Text>
    </Screen>
  )
}
