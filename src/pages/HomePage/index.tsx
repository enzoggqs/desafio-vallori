import React, { useEffect, useState } from 'react'
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { Paper, Box, CssBaseline, InputBase, Typography, Button } from '@mui/material';
import SearchBar from '../../components/SearchBar';
import { useNavigate } from 'react-router-dom';

import { logout } from '../../store/Authorization.store' 
import { useDispatch } from 'react-redux';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: 'white',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: 'pink',
  fontWeight: 'bold'
}));

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let [search, setSearch] = useState("");

  const goRouteShowDetails = (show: string) => {
    navigate(`/${show}`);
  }

  useEffect(() => {
    search !== '' && (
      goRouteShowDetails(search)
    )
  
  }, [search])

  function doLogout(){
    localStorage.setItem('authorized', 'false');
    dispatch(logout())
    navigate("/login")
  }

  
  return (
    <Box 
      sx={{ display:'flex', alignItems:'center',  paddingTop: 10, margin: 'auto', height: '100vh', flexDirection:'column'}}
      component="main" 
      maxWidth="xs"
    >
      <CssBaseline />
      <Item sx={{bgColor:'white',marginRight: 'auto', marginLeft: 40, cursor: 'pointer'}} onClick={() => doLogout()}>
        Logout
      </Item>
      <Typography component="h1" variant="h3" sx={{color:'white', paddingTop: 25}}>
        Faça agora sua busca por séries incríveis
      </Typography>
      <SearchBar setSearch={setSearch}/>
    </Box>
  )
}

export default HomePage
