import React from 'react'
import Navbar from '../../../components/Navbar'
import { useState, useEffect } from 'react'


const reclamacoes = () => {
  
  let cpf = localStorage.getItem('cpf')

  const verificar = () => {
    if (cpf == null || cpf == undefined) {
      window.location.href = '/login'
    }
  }

  useEffect(() => {
    verificar()
  }, [])

  return (
    <>
      <Navbar/>
    </>
  )
}

export default reclamacoes