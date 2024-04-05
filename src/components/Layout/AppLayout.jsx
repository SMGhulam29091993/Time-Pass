import React from 'react';
import Header from './Header';
import Title from '../Shared/Title';
import { Grid } from '@mui/material';
import ChatList from '../specifics/ChatList';
import { eggShell } from '../../constants/color';
import { sampleChats } from '../../constants/SampleData';
import {useParams} from "react-router-dom";

const AppLayout = () => (WrappedComponent) => {
  return (props)=>{
    const params = useParams();
    const chatId = params.chatID;

    const handleDeleteChat = (e, _id, groupChat)=>{
        e.preventDefault();
        console.log(`Delete Chat ${_id} , ${groupChat}`);
    }

    return (
        <>
            <Title/>
            <Header/>
            <Grid container style={{ height: "calc(100vh - 4rem)" }} >
                <Grid item sm={4} md={3} sx={{display: {xs :"none", sm:"block"}, bgcolor:eggShell}} height={"100%"}>
                    <ChatList chats={sampleChats} chatId={chatId} onlineUsers={["1","2"]} handleDeleteChat={handleDeleteChat}/>
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