// import React, { useEffect, useState } from 'react';
// import {getUsers, deleteUser} from '../../../services/APIservice'
import './users.css'
import Sidebar from '../../../components/Drawer'

import React from 'react'

const users = () => {
  return (
    <>
    <div className="header">
      <Sidebar/>
    </div>
    </>
    
  )
}

export default users