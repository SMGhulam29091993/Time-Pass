import { AppBar, Backdrop, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import React, { Suspense, lazy, startTransition, useState } from 'react';
import { asparagus } from '../../constants/color';
import { Menu as MenuIcon, Search as SearchIcon, Add as AddIcon, Group as GroupIcon, Notifications as NotificationIcon} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';


const Search = lazy(()=>import("../specifics/Search"));
const Notifications = lazy(()=>import("../specifics/Notifications"));
const NewGroups = lazy(()=>import("../dialogues/NewGroups"));


const Header = () => {
  const navigate = useNavigate();
  const [isMobile,setIsMobile] = useState(false);
  const [isSearch,setIsSearch] = useState(false);
  const [isNewGroup, setIsNewGroup] = useState(false);
  const [isNotification, setIsNotification] = useState(false);


  const handleMobile = ()=>{
    setIsMobile((prev)=>!prev);
  }
  const openSearchDialogue = ()=>{
    setIsSearch((prev)=>!prev);
  }
  const openNewGroup = ()=>{
    setIsNewGroup((prev)=>!prev)
  }

  const openNotification = ()=>{
    setIsNewGroup((prev)=>!prev)
  }
  const openManageGroup = ()=>{
    startTransition(()=>{
      navigate("/groups");
      console.log("ManageGroup");
    })
    
  }
  return (
    <>
      <Box sx={{flexGrow: 1}} height={"4rem"}>
        <AppBar position='static' sx={{bgcolor:asparagus}} >
          <Toolbar>
            <Typography variant='h6' sx={{display:{xs:"none",sm:"block"}}}>Time-Pass</Typography>
          
            <Box sx={{display:{xs:"block", sm:"none"}}} > 
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon/>
              </IconButton>
            </Box>
            <Box sx={{flexGrow:1}} />
            <Box>

              <IconBtn title={"Search"} icon={<SearchIcon/>} onClick={openSearchDialogue}  />
             
              <IconBtn title={"New Group"} icon={<AddIcon/>} onClick={openNewGroup}  />

              <IconBtn title={"Manage Groups"} icon={<GroupIcon/>} onClick={openManageGroup}  />
              
              <IconBtn title={"Notification Bell"} icon={<NotificationIcon/>} onClick={openNotification} />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      {isSearch && (
        <Suspense fallback={<Backdrop open />}><Search/></Suspense>
      )}
      {isNotification && (
        <Suspense fallback={<Backdrop open />}><Notifications/></Suspense>
      )}
      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}><NewGroups/></Suspense>
      )}
    </>
  )
}

const IconBtn = ({title, icon, onClick})=>{
  return(
    <Tooltip title={title}>
      <IconButton color='inherit' size="large" onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  )
}

export default Header