import Onboarding from '@/components/Onboarding'
import {router } from 'expo-router'
import React from 'react'


const index = () => {
  return (
    <>
    
    <Onboarding 
        caminho_imagem='Trust'
        texto='Juntos, estamos transformando o aprendizado de centenas de usuários.'
        proxima_pagina={()=>router.push('/second-')}
    ></Onboarding>
    </>
    
  )
}


export default index