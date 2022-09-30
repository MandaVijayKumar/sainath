import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container'
import { Paper } from '@mui/material';
// import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid'; // Grid version 1
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import vc from '../assets/images/VC_Anandarao_sir.jpg'
import { display, Stack } from '@mui/system';


function Home() {


    return (


        <Box
            sx={{
                width: '100%',
                height: 200,
                backgroundColor: 'primary.dark',
                '&:hover': {
                    backgroundColor: 'primary.main',
                    opacity: [0.9, 0.8, 0.7],
                },
            }}
        >
           <Stack direction="row" spacing={2} >
           <Box Box  sx={{
                width: '30%',
                height: 200,
                display: 'flex',
                flexDirection: 'column',
                
           }}
           >
            <img src={vc} alt="" style={{width: '150px', hieght: '150px'}}/>
            <h5>Prof Akopogu Ananda Rao</h5>
           </Box>
           <Box  sx={{
                width: '70%',
                height: 200,
           }}
           >

           </Box>
        
          </Stack>
          <Box sx={{height: '30px', backgroundColor:'secondary.light'}}>

          </Box>


        </Box>


    )
}

export default Home