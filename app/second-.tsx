import Onboarding from '@/components/Onboarding'
import { Stack, router } from 'expo-router'
import React from 'react'

const Onbordiang2 = () => {
  return (
    <>
    
    <Onboarding 
        caminho_imagem='Lupa'
        texto='Estudantes de todo o mundo confiam no nosso método para crescer e aprender.'
        proxima_pagina={()=>router.push('/third')}
    ></Onboarding>
    </>
    
  )
}

export default Onbordiang2