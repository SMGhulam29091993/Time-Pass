import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material';
import { IconButton, Stack } from '@mui/material';
import React, { useRef } from 'react';
import AppLayout from '../components/Layout/AppLayout';
import { InputBox } from '../components/styles/StyledComponents';
import { gray } from '../constants/color';
import FileMenu from '../components/dialogues/FileMenu';
import { sampleMessage } from '../constants/SampleData';
import MessageComponent from '../components/Shared/MessageComponent';


const user = {
  _id : "akjxchkd4adcdc86d8c",
  name : "Chutya Bosu"
}

const Chat = () => {
  const containerRef = useRef(null);
  


  return (
    <>
      <Stack ref={containerRef} boxSizing={"border-box"} padding={"1rem"} spacing={"1rem"} 
        bgcolor={gray} height={"90%"} sx={{overflowX:"hidden", overflowY:"auto"}}>
          {sampleMessage.map((message)=>(
            <MessageComponent key={message._id} message={message} user={user} />
          ))}
      </Stack>
      <form style={{height:"10%"}}>
        <Stack direction={"row"} height={"100%"} padding={"0.5rem"} alignItems={"center"} position={'relative'}>
          <IconButton sx={{position:"absolute", left:"1.5rem", rotate:"30deg" }} >
            <AttachFileIcon/>
          </IconButton>
          <InputBox placeholder='Type your message here...'/>
          <IconButton type='submit' sx={{bgcolor:'primary.main', color:"#fff", marginLeft:"1rem", 
            padding:"0.5rem", "&:hover":{bgcolor:"primary.dark"} }} >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
      <FileMenu />
    </>
  )
}

export default AppLayout()(Chat);