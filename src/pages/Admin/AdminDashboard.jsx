import React from 'react'
import AdminLayout from '../../components/Layout/AdminLayout'
import { Box, Container, Paper, Stack, Typography } from '@mui/material'
import { AdminPanelSettings as AdminPanelSettingsIcon, Group as GroupIcon, Message as MessageIcon, Notifications as NotificationsIcon, Person as PersonIcon } from '@mui/icons-material'
import moment from 'moment'
import { CurveButton, SearchField } from '../../components/styles/StyledComponents'
import { DoughnutChart, LineChart } from '../../components/specifics/Chart'


const AdminDashboard = () => {
  
  const AppBar = <>
    <Paper elevation={3} sx={{padding:"2rem", margin:"2rem 0", borderRadius:"1rem"}}>
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <AdminPanelSettingsIcon sx={{fontSize:"3rem"}} />
        <SearchField placeholder='Search...' />
        <CurveButton>Search</CurveButton>
        <Box flexGrow={1} />
        <Typography sx={{display:{xs:"none", lg:"block"}, textAlign :"center", color : "rgba(0,0,0,0.7)"}} >{moment().format('MMMM Do YYYY, h:mm:ss a')}</Typography>
        <NotificationsIcon />
      </Stack>
    </Paper>
  </>

  const Widgets = <>
    <Stack direction={{xs:"column", sm:"row"}} spacing={"1rem"} justifyContent={"space-between"}
                  alignItems={"center"} margin={"2rem 0"}>
      <Widget title={"Users"} value={34} icon={<PersonIcon />} />
      <Widget title={"Chats"} value={3} icon={<GroupIcon />} />
      <Widget title={"Messages"} value={555} icon={<MessageIcon />} />
    </Stack>
  </>

  return (
    <AdminLayout>
        <h1 style={{textAlign :"center", fontWeight : "Bold"}}>Dashboard</h1>
        <Container component={"main"}>
          {AppBar}

          <Stack direction={{xs:"column", lg:"row"}} gap={"1rem"} flexWrap={"wrap"} 
              alignItems={{xs:"center", lg:"stretch"}} justifyContent={"center"} gap={"1rem"}>
            <Paper elevation={3} sx={{padding : "1rem 1.5rem",
                    borderRadius : "1rem", width : "100%", maxWidth :"35rem", }}>
              <Typography variant='h5' margin={"2rem 0"}>Last Messages</Typography>
              <LineChart value={[]} />
            </Paper>
            <Paper elevation={3} sx={{padding:"1rem", borderRadius:"1rem", display:"flex", justifyContent:"center",
                                      alignItems:"center", width:{xs:"100%", sm:"50%"}, position:"relative",    
                                      width:"100%", maxWidth:"20rem", }}>
              
              <DoughnutChart labels={["Single Chats", "Group Chats"]} value={[29,69]} />

              <Stack position={"absolute"} direction={"row"} justifyContent={"center"} alignItems={"center"}
                      spacing={"0.5rem"} width={"100%"} height={"100%"}>
                <GroupIcon /> <Typography>VS</Typography> <PersonIcon />

              </Stack>

            </Paper>
          </Stack>
          {Widgets}
        </Container>
    </AdminLayout>
  )
}


const Widget = ({title, value, icon})=>(
  <Paper elevation={3} sx={{padding:"2rem", margin:"2rem 0", width:"20rem", borderRadius:"1.5rem"}}>
    <Stack alignItems={"center"} spacing={"1rem"}>  
      <Typography sx={{color:"rgba(0,0,00.7)", borderRadius:"50%", border:"5px solid rgba(0,0,0,0.9)",
                      width:"5rem", height:"5rem", display:"flex", justifyContent:"center", alignItems:"center"
      }}>{value}</Typography>
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"} >
        {icon}
        <Typography>{title}</Typography>
      </Stack>
    </Stack>
  </Paper>
)


export default AdminDashboard