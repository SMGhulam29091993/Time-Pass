import React from 'react';
import Header from './Header';
import Title from '../Shared/Title';
import { Grid } from '@mui/material';
import ChatList from '../specifics/ChatList';
import { ivory, orange } from '../../constants/color';
import { sampleChats } from '../../constants/SampleData';
import {useParams} from "react-router-dom";
import Profile from '../specifics/Profile';

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
                <Grid item sm={4} md={3} sx={{display: {xs :"none", sm:"block"}, bgcolor:ivory}} height={"100%"} >
                    <ChatList chats={sampleChats} chatId={chatId} onlineUsers={["1","2"]} handleDeleteChat={handleDeleteChat}/>
                </Grid>
                <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
                    <WrappedComponent {...props} />
                </Grid>
                <Grid item md={4} lg={3} 
                    sx={{display : {xs:"none", md:"block"}, padding:"2rem", bgcolor:orange}} 
                        height={"100%"}>
                    <Profile />
                </Grid>
            </Grid>
        </>
    )
  }
}

export default AppLayout