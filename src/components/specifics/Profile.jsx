import React from 'react'
import {Avatar, Stack, Typography} from "@mui/material";
import { Face as FaceIcon, AlternateEmail as UserNameIcon, CalendarMonth as CalendarIcon } from "@mui/icons-material";
import moment from "moment";


const Profile = () => {
  return (
    <Stack alignItems={"center"} direction={'column'} spacing={"2rem"}>
        <Avatar sx={{height:120, width : 120, objectFit : "contain", marginBottom : "1rem", border:"5px solid white"}} />
        <ProfileCard heading={"Bio"} text={"jkv nvldzn zn ldz"} />
        <ProfileCard heading={"UserName"} text={"smghulamfitness"} Icon={<UserNameIcon/>} />
        <ProfileCard heading={"Nickname"} text={"Fit-ALpha-X"} Icon={<FaceIcon/>} />
        <ProfileCard heading={"Join"} text={moment("2022-09-13T00:00:00.000Z").fromNow()} Icon={<CalendarIcon/>} />
    </Stack>
  )
}

const ProfileCard = ({text, Icon, heading})=>{
    return (
        <Stack direction={"row"} textAlign={"center"} alignItems={"center"} color={"white"} spacing={"1rem"}>         
            {Icon && Icon}
            <Stack>
                <Typography variant="body1" >{text}</Typography>
                <Typography color={"gray"} variant="caption" >{heading}</Typography>
            </Stack>
        </Stack>
       
    )
}

export default Profile