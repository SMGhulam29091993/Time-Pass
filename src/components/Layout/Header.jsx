import { AppBar, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import React, { startTransition } from 'react'
import { orange } from '../../constants/color'
import { Menu as MenuIcon, Search as SearchIcon, Add as AddIcon, Group as GroupIcon} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate();
  const handleMobile = ()=>{
    console.log("Mobile");
  }
  const openSearchDialogue = ()=>{
    console.log("Search Dialogue Opened");
  }
  const openNewGroup = ()=>{
    console.log("New Group Opened");
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
        <AppBar position='static' sx={{bgcolor:orange}} >
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
              
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
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