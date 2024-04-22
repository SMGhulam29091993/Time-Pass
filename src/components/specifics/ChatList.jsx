import { Stack } from '@mui/material'
import React from 'react'
import ChatItem from '../Shared/ChatItem'

const ChatList = ({w="100%", chats=[], chatId, onlineUsers=[], newMessagesAlert=[{chatId, count:0}], handleDeleteChat }, ) => {
    return (
      <div>
        <Stack width={w} direction={'column'}>
          {chats?.map((data, index)=>{
            const {name, avatar, _id, groupChat, members} = data;
            const newMessageAlert = newMessagesAlert.find(({chatId})=>chatId === _id);
            const isOnline = members?.some((member)=>onlineUsers.includes(_id));

            return <ChatItem newMessageAlert={newMessageAlert} index={index} isOnline={isOnline} 
                    key={_id} name={name} _id={_id} avatar={avatar} groupChat={groupChat} 
                    sameSender={chatId === _id} handleDeleteChat={handleDeleteChat} />
          })}
        </Stack>
      </div>
    )
}

export default ChatList