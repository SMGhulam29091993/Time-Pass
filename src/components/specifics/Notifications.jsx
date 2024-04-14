import React, { memo } from 'react';
import { Dialog, Stack, DialogTitle, ListItem, Typography, Button, Avatar} from "@mui/material";
import { sampleNotification } from '../../constants/SampleData';

const Notifications = () => {
  const friendRequestHandler = ({_id, accept})=>{
    //add friend
  }

  return (
    <>
      <Dialog open>
        <Stack p={{xs:"1rem", sm:"2rem"}} maxwidth={"25rem"}>
          <DialogTitle>Notification</DialogTitle>
          { sampleNotification.length > 0 ? (
            sampleNotification.map(({sender, _id})=>(<NotificationItem sender={sender} _id={_id}
                 handler={friendRequestHandler} key={_id} />))
          ) : 
            (<Typography textAlign={'center'}>No Notifications</Typography>)
          }
        </Stack>
      </Dialog>
    </>
  )
}

const NotificationItem = memo(({sender, _id, handler})=>{
  return (
    <>
      <ListItem >
        <Stack direction={"row"} width={"100%"} alignItems={"center"} spacing={"1rem"} >
          <Avatar src={sender.avatar} />
          <Typography variant='body1' sx={{flexGrow : 1, display :"-webkit-box", WebkitLineClamp : 1, width:"100%", 
                          WebkitBoxOrient :"vertical", overflow: "hidden", textOverflow:"ellipsis"}} >
                              {sender.name} sent you a friend request</Typography>
          <Stack direction={{xs:"column", sm:"row"}}>
            <Button color='success' onClick={()=>handler({_id,accept:true})}>Accept</Button>
            <Button color='error' onClick={()=>handler({_id,accept:false})}>Reject</Button>
          </Stack>
        </Stack>
      </ListItem>
    </>
  )
});

export default Notifications