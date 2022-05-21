import { Box, Container, CssBaseline, Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";

const baseURL: string = 'https://api.tvmaze.com/singlesearch/shows?q='

function removeTags(str: string) {
  if ((str===null) || (str===''))
        return false;
    else
        str = str.toString();

  return str.replace( /(<([^>]+)>)/ig, '');
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: 'black',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: 'gold',
}));

const ShowDetails = () => {
  let { show } = useParams();
  let [data, setData] = useState<any>();
  let [loading, setLoading] = useState(true)

  const navigate = useNavigate();
  
  useEffect(() => {
    fetch(`${baseURL}${show}&embed=episodes`)
        .then(response => response.json())
        .then((res) => {
          setData(res);
          setTimeout(()=>{
            setLoading(false)
          }, 2000)
        })
        
    console.log(data);
  }, [])

  return (
    <Box
      sx={{ 
        paddingX:10,
        display:'flex', 
        margin: 'auto', 
        height: '100%', 
      }}
      component="main" 
      >
      <CssBaseline />
      {
        loading ? 
        (
          <div style={{height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems:'center', justifyContent:'center'}}>
            <CircularProgress />
          </div>
        )  :
        (
          <div>
            <ArrowBackIcon onClick={() => navigate("/")} sx={{marginTop: 5, height: 50, width: 40, color: 'white', cursor: 'pointer'}}/>
            {
              !data ? 
              (
                <div>
                  <Box sx={{display: 'flex', justifyContent: 'space-around'}} paddingTop={25} paddingLeft={10} flexDirection={'row'}>
                    <Box>
                      <Typography component="h1" variant="h2" sx={{color:'#fff', fontWeight:"bold"}}>
                        Ops...
                      </Typography>
                      <Typography component="h1" variant="h2" sx={{color:'#fff'}}>
                        Page not found
                      </Typography>
                      <Typography component="h4" variant="h4" sx={{color:'#fff', paddingTop: 2}}>
                        O link que você pesquisou não existe ou a página foi removida
                      </Typography>
                    </Box>
                    <Typography component="h1" variant="h1" sx={{color:'#fff', fontWeight:"bold", paddingLeft: 30, fontSize: 200}}>
                      404
                    </Typography>
                  </Box>
                </div>
              ) : 
              (
                <div>
                  <Grid container justifyContent="flex-start" sx={{paddingTop: 20}}>
                    <Grid item xs={1}></Grid>
                    <Grid 
                      container
                      direction="column"
                      item 
                      xs={6}
                      sx={{justifyContent: 'center'}}
                    >
                      <Grid item xs={2}>
                        <Box>
                          <Typography component="h1" variant="h2" sx={{color:'#fff', fontWeight:"bold"}}>
                            {data?.name}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid container item xs={1}>
                        <Grid item xs={2}>
                          <Typography component="h6" variant="h6" sx={{color:'#fff'}}>
                            Productor: {data?.network?.name || '-'}
                          </Typography>
                        </Grid>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={1}>
                          <Item sx={{ height:35, justifyContent:'start', alignItems:'start', width: 55, fontSize: 16, display: 'flex', flexDirection:'row'}}>
                            {data?.rating?.average}
                            <StarIcon sx={{marginLeft: 0.5, width: 12, color:'gold'}}/>
                          </Item>
                        </Grid>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={4}>
                          <Typography component="h6" variant="h6" sx={{color:'#fff'}}>
                            {data?.premiered}{" - "}
                            {data?.ended || 'Current'}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item xs={1} sx={{marginTop: 2, display: 'flex', flexDirection: 'row'}}>
                        {data?.genres?.map((item:string, index: number) => (
                          <Typography key={index} component="p" sx={{color:'#fff', fontWeight:"bold"}}>
                            {" | "}{item}{" | "}
                          </Typography>
                        )
                      )}  
                      </Grid>
                      <Grid container item xs={3}>
                        <Grid item xs={5}> 
                          <Typography component="p" sx={{color:'#fff'}}>
                            {data && removeTags(data?.summary) || "-"}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item xs={1}></Grid>
                      <Grid item xs={2}>
                        <Grid item xs={4}>
                          <Typography component="h6" variant="h6" sx={{display: 'flex', flexDirection:'column', color:'#fff'}}>
                            Episodes Numbers: {"  "}
                            
                            {data?._embedded?.episodes?.length}
                          </Typography>
                        </Grid>
                      </Grid>
                      {/* <Grid container item xs={2}>
                        
                      </Grid> */}
                    </Grid>
                    <Grid 
                      container 
                      item 
                      xs={5}
                      sx={{paddingTop: 0}}
                    >
                      <Box
                        component="img"
                        sx={{
                          height: 480,
                          width: 390,
                          border: 1 
                        }}
                        alt="The house from the offer."
                        src={data?.image?.original}
                      />
                    </Grid>
                  </Grid>
                </div>
              )
            }
          </div>
        )
      }
    </Box>
  )
}

export default ShowDetails