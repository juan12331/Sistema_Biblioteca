import { Drawer } from "@mui/material";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Person3Icon from '@mui/icons-material/Person3';
import './Drawer.css'
import CampaignIcon from '@mui/icons-material/Campaign';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import LogoutIcon from '@mui/icons-material/Logout';
import DrawIcon from '@mui/icons-material/Draw';

import React from 'react'
import { useState } from 'react'

const Sidebar = () => {

  const [isDrawerOpen, setDrawerOpen] = useState(false)
  
  return (
    <>

      <IconButton size='large' edge='start' color='inherit' aria-label='logo' onClick={() => setDrawerOpen(true)}>
        <MenuIcon l={2} />
      </IconButton>
      <Drawer className="drawer" anchor="left" open={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box p={2} width='15rem' textAling='centter' role='presentation' >
          <Typography variant='h6' component='div' className="title" >Biblioteca Demais</Typography>
          <div className="links">
            <a href="/Adm/Users" ><Person3Icon className="icon" /> Usuarios</a>
            <a href="/Adm/Reclamacoes" > <CampaignIcon className="icon" /> Reclamações</a>
            <a href="/Adm/Livros" > <AutoStoriesIcon className="icon" /> Livros</a>
            <a href="/Adm/Autores" > <DrawIcon className="icon" /> Autores</a>
            <a href="/Cadastro" > <LogoutIcon className="icon" /> Sair</a>
          </div>
        </Box>
      </Drawer>
    </>
  )
}

export default Sidebar
