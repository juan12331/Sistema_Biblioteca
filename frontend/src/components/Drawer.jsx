import { Drawer } from "@mui/material";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';


import React from 'react'
import { useState } from 'react'

const Sidebar = () => {

  const theme = {
    spacing: 8,
  }

    const [isDrawerOpen, setDrawerOpen] = useState(false)
  return (
    <>
    
    <IconButton size='large' edge='start' color='inherit' aria-label='logo' onClick={() => setDrawerOpen(true)}>
        <MenuIcon l={2}/>
    </IconButton>
    <Drawer anchor="left" open={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box p={2} width='15rem' textAling='centter' role='presentation' >
            <Typography variant='h6' component='div' >Links</Typography>
            <Typography variant='ol' component='div' b={1}><a href="/Adm/Users">Usuarios</a></Typography>
            <Typography variant='ol' component='div' ><a href="/Adm/Reclamacoes">Reclamações</a></Typography>
        </Box>
    </Drawer>
</>
  )
}

export default Sidebar
