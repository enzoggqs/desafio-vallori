import React, { ReactNode } from 'react';

import { useSelector } from 'react-redux';

import { RootState } from './store';
import { login, logout } from './store/Authorization.store' 

import Signin from './pages/Signin';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";

interface Props {
  children: ReactNode;
}

function App() {
  const userDefault = useSelector((state: RootState) => state.userDefault)
  
  const currentUserEmail = useSelector((state: RootState) => state.currentUser.email)
  const isLogged = useSelector((state: RootState) => state.currentUser.isLogged)

  console.log(userDefault, currentUserEmail, isLogged);

  const Private: React.FC<Props> = ({ children, ...props }) => {

    if(!isLogged) {
        return <Navigate to="/login"/>
    }

    return children;
}

  // return (
  //   <div className="App">
  //     <div className="App-header">
  //       <p onClick={() => dispatch(login('testes'))}>
  //         Edit <code>src/App.tsx</code> and save to reload.
  //       </p>
  //       <div>{currentUser.email}</div>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //       <p onClick={() => dispatch(logout())}>Logout</p>
  //     </div>
  //   </div>
  // );
  return (
    <Router>
      <Signin/>

    </Router>
  )
}

export default App;
