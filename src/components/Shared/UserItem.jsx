import React, { memo } from 'react';
import { ListItem, Stack, Avatar,Typography,IconButton  } from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";

const UserItem = ({user, handler, handlerIsLoading, isAdded, styling={}}) => {

  const {name, _id, avatar} = user;


  return (
    <ListItem >
      <Stack direction={"row"} width={"100%"} alignItems={"center"} spacing={"1rem"} {...styling} >
        <Avatar />
        <Typography variant='body1' sx={{flexGrow : 1, display :"-webkit-box", WebkitLineClamp : 1, width:"100%", 
                        WebkitBoxOrient :"vertical", overflow: "hidden", textOverflow:"ellipsis"}} >{name}</Typography>
        <IconButton onClick={()=>handler(_id)} disabled={handlerIsLoading}
            size='small' sx={{bgcolor:isAdded?"error.main":"primary.main", color :"#fff", 
              "&:hover":{bgcolor : isAdded?"error.dark":"primary.dark"},}}>
        {isAdded?(<RemoveIcon/>): (<AddIcon />)}
          
        </IconButton>
      </Stack>
    </ListItem>
  )
}

export default memo(UserItem)