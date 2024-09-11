import { Close as CloseIcon, Dashboard as DashboardIcon, ExitToApp as ExitToAppIcon, Groups as GroupsIcon, ManageAccounts as ManageAccountsIcon, Menu as MenuIcon, Message as MessageIcon } from '@mui/icons-material';
import { Box, Drawer, Grid, IconButton, Stack, Typography, styled } from '@mui/material';
import { useState } from 'react';
import { Link as LinkComponent, Navigate, useLocation } from 'react-router-dom';
import { gray } from '../../constants/color';

const Link = styled(LinkComponent)`
    border-radius : 2rem;
    text-decoration : none;
    padding: 1rem 2rem;
    color : black;
    &:hover{
        color: rgba(0,0,0,0.74);
    }
`

export const adminTab = [
    {
        name:"Dashboard",
        route :"/admin/dashboard",
        icon: <DashboardIcon />
    },
    {
        name:"Users",
        route :"/admin/users-management",
        icon: <ManageAccountsIcon />
    },
    {
        name:"Chat",
        route :"/admin/chats-management",
        icon: <GroupsIcon />
    },
    {
        name:"Messages",
        route :"/admin/messages",
        icon: <MessageIcon />
    },
]

const isAdmin = true;

const SideBar =({w="100%"})=>{
    const location = useLocation();

    const logoutHandler = ()=>{
        console.log("Log-Out");
    }
    return (
        <Stack width={w} direction={"column"} padding={"3rem"} spacing={"3rem"}>
            <Typography variant='h5' textTransform={"uppercase"} textAlign={"center"} >Time-Pass Admin</Typography>
            <Stack spacing={"1rem"}> 
                {adminTab.map((tab)=>(
                    
                    <Link key={tab.route} to={tab.route} sx={location.pathname === tab.route && {
                        bgcolor: gray,
                        color : "black",
                        "&:hover":{color:"#fff", bgcolor:"black"}
                    }}>
                        <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
                            {tab.icon}
                            <Typography>{tab.name}</Typography>
                        </Stack>
                    </Link>
                    
                ))}
                <Link onClick={logoutHandler}>
                        <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
                            <ExitToAppIcon/>
                            <Typography>Log-Out</Typography>
                        </Stack>
                    </Link>
            </Stack>
        </Stack>
    )
}


const AdminLayout = ({children}) => {

    const [isMobile,setIsMobile] = useState(false);

    const handleMobile = ()=>{
        setIsMobile((prev)=>!prev);
    }

    const handleClose = ()=>setIsMobile(false);

    if(!isAdmin) return <Navigate to="/admin"/>

  return (
    <Grid container minHeight={"100vh"}>
        <Box sx={{display:{xs:"block", md:"none"}, position:"fixed", right:"1rem", top:"1rem"}}>
            <IconButton onClick={handleMobile}>
                {isMobile?(<CloseIcon/>):(<MenuIcon />)}
            </IconButton>
        </Box>
        <Grid item md={4} lg={3} sx={{display:{xs:"none", md:"block"}}} >
            <SideBar />
        </Grid>
        <Grid item xs={12} md={8} lg={9} sx={{bgcolor:gray}}>
            {children}
        </Grid>
        <Drawer open={isMobile} onClose={handleClose}>
            <SideBar w={"50vw"} />
        </Drawer>
    </Grid>
  )
}

export default AdminLayout