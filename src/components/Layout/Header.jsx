import {
  Add as AddIcon, Group as GroupIcon,
  ExitToApp as LogoutIcon,
  Menu as MenuIcon,
  Notifications as NotificationIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { AppBar, Backdrop, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import { Suspense, lazy, startTransition, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { asparagus } from '../../constants/color';
import {useDispatch} from "react-redux";
import axios from "axios";
import {server} from "../../constants/config";
import toast from "react-hot-toast";
import { userNotExists } from '../../redux/reducers/auth';

 
const Search = lazy(()=>import("../specifics/Search"));
const Notifications = lazy(()=>import("../specifics/Notifications"));
const NewGroups = lazy(()=>import("../specifics/NewGroups"));


const Header = () => {
  const navigate = useNavigate();
  const [isMobile,setIsMobile] = useState(false);
  const [isSearch,setIsSearch] = useState(false);
  const [isNewGroup, setIsNewGroup] = useState(false);
  const [isNotification, setIsNotification] = useState(false);

  const dispatch = useDispatch();


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
    setIsNotification((prev)=>!prev)
  }
  const openManageGroup = ()=>{
    startTransition(()=>{
      navigate("/groups");
      console.log("ManageGroup");
    })
  }
  
  const logoutHandler = async ()=>{
    try {
      const {data} = await axios.get(`${server}/api/v1/user/logout`, {withCredentials : true});

      if(!data.success){
        toast.error(data?.message);
      }

      // setting user in redux as null to redirect to login page
      dispatch(userNotExists());
      toast.success(data.message);
      
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong!!!")
    }
  };

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

              <IconBtn title={"Logout"} icon={<LogoutIcon/>} onClick={logoutHandler} />
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