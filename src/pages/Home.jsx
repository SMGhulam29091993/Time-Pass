import { List, ListItem, Stack, Typography } from '@mui/material';
import React from 'react';
import AppLayout from '../components/Layout/AppLayout';

const Home = () => {
  return (
    <>
      <Typography p={"2rem"} variant='h1' textAlign={'center'} >Home</Typography>
      <Stack sx={{display:"flex", alignItems:"center", justifyContent:"center" }} spacing={1} >
        <List sx={{ padding: '16px', backgroundColor: '#f0f0f0' }}>
          <ListItem sx={{ marginBottom: '8px' }}>
            <Typography  sx={{ textDecoration: 'underline' }}>Select a friend to chat</Typography>
          </ListItem>
          <ListItem sx={{ marginBottom: '8px' }}>
            <Typography  sx={{ textDecoration: 'underline' }}>Deleting a chat will lead to unfriending too.</Typography>
          </ListItem>
          <ListItem>
            <Typography  sx={{ textDecoration: 'underline' }}>Share your QR to let others find your profile</Typography>
          </ListItem>
      </List>
      </Stack>
    </>
    
  )
}

export default AppLayout()(Home);