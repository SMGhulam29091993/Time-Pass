import React from 'react'
import { Stack, Box, Avatar,AvatarGroup } from "@mui/material";
import { transformImage } from '../../lib/features';

const AvatarCard = ({avatar=[], max=4}) => {
  return (
    <Stack direction={"row"} spacing={"0.5"}>
        <AvatarGroup max={max} sx={{position:"relative"}}>
            <Box width={"5rem"} height={"3rem"}>
                {avatar.map((src,index)=>(
                    <Avatar key={Math.random()*100} src={transformImage(src)} alt={`Avatar ${index}`} 
                        sx={{width : "3rem", height : "3rem", position:"absolute", left :{xs : `${0.5+index}rem`, sm:`${index}rem`}, bgcolor: "black"}} />
                ))}
            </Box>
        </AvatarGroup>
    </Stack>
  )
}

export default AvatarCard
