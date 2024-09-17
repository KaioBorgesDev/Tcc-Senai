import React from 'react'
import { Text, StyleSheet } from 'react-native'

interface LabelProps{
    texto: string
}
const Label : React.FC<LabelProps> = ({texto}) => {
  return (
    <Text style={{fontSize: 15, opacity: 0.5}}> {texto} </Text>
  )
}

export default Label

