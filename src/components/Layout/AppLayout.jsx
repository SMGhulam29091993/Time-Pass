import React from 'react';
import Header from './Header';
import Title from '../Shared/Title';
import { Grid } from '@mui/material';
import ChatList from '../specifics/ChatList';
import { eggShell } from '../../constants/color';

const AppLayout = () => (WrappedComponent) => {
  return (props)=>{
    return (
        <>
            <Title/>
            <Header/>
            <Grid container style={{ height: "calc(100vh - 4rem)" }} >
                <Grid item sm={4} md={3} sx={{display: {xs :"none", sm:"block"}, bgcolor:eggShell}} height={"100%"}>
                    <ChatList chats={[1,2,3,4,5]}/>
                </Grid>
                <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
                    <WrappedComponent {...props} />
                </Grid>
                <Grid item md={4} lg={3} 
                    sx={{display : {xs:"none", md:"block"}, padding:"2rem", bgcolor:"rgba(223,255,0,0.85)"}} 
                        height={"100%"}>
                    Third
                </Grid>
            </Grid>
        </>
    )
  }
}

export default AppLayout