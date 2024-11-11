import Onboarding from '@/components/Onboarding'
import { Stack, router } from 'expo-router'
import React from 'react'

const third = () => {
  return (
    <>
    
    <Onboarding 
        caminho_imagem='Celular'
        texto='Confiado por milhares de estudantes que buscam excelência'
        proxima_pagina={()=>router.push('/Login')}
    ></Onboarding>
    </>
  )
}

export default third