import React, { ReactNode } from 'react';

import { useSelector } from 'react-redux';

import { RootState } from '../store';
import { login, logout } from '../store/Authorization.store' 

import Signin from '../pages/Signin';
import HomePage from '../pages/HomePage';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { Box } from '@mui/material';

import ProtectedRoutes from './ProtectedRoutes';
import ShowDetails from '../pages/ShowDetails';

function AppRoutes() {
  const userDefault = useSelector((state: RootState) => state.userDefault)
  
  const currentUserEmail = useSelector((state: RootState) => state.currentUser.user)
  const isLogged = useSelector((state: RootState) => state.currentUser.isLogged)

  return (
    <Box height={'100%'}>
      <Router>
        <Routes>
          <Route path='/login' element={<Signin/>} />
          <Route path='/' element={<ProtectedRoutes/>}>
            <Route path='/' element={<HomePage/>}/>
          </Route>
          <Route path='/:show' element={<ProtectedRoutes/>}>
            <Route path='/:show' element={<ShowDetails/>}/>
          </Route>
        </Routes>
      </Router>
    </Box>
  )
}

export default AppRoutes;
