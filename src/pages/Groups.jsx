import { Backdrop, Box, Button, Drawer, Grid, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import React, { Suspense, lazy, memo, useEffect, useState } from 'react';
import { gray, ivory } from '../constants/color';
import { Add as AddIcon, Delete as DeleteIcon, Done as DoneIcon, Edit as EditIcon, KeyboardBackspace as KeyboardBackspaceIcon, Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Link } from '../components/styles/StyledComponents';
import AvatarCard from '../components/Shared/AvatarCard';
import { sampleChats, sampleUsers } from '../constants/SampleData';
import UserItem from '../components/Shared/UserItem';

const ConfirmDeleteDialogue = lazy(()=>import("../components/dialogues/ConfirmDeleteDialogue"));
const AddMemberDialog = lazy(()=>import("../components/dialogues/AddMemberDialog"));

const isAddMember = false;

const Groups = () => {
  const navigate = useNavigate();

  const chatId = useSearchParams()[0].get("group");
  console.log(chatId);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false)


  const navigateBack = ()=>{
    navigate("/")
  }

  const handleMobile = ()=>{
    setIsMobileMenuOpen((prev)=>!prev)
  }

  const handleMobileClose = ()=>{
    setIsMobileMenuOpen(false)
  }

  const handleGroupName = ()=>{
    setIsEdit(false);
    console.log(groupNameUpdatedValue);
  }

  const openConfirmDeleteHandler = ()=>{
    setConfirmDeleteDialog(true);
    console.log("Delete Group");
  }

  const closeConfirmDeleteHandler = ()=>{
    setConfirmDeleteDialog(false)
  }

  const deleteHandler = ()=>{}

  const openAddMemberHandler = ()=>{}

  const removeMemberHandler = (id)=>{
    console.log(`Remove Member : ${id}`);
  }

  const IconBtns = <>
    <Box sx={{display:{xs : "block", sm:"none", position : "fixed", top :"1rem", right : "1rem"}}}>
      <IconButton onClick={handleMobile} >
        <MenuIcon />
      </IconButton>
    </Box>
    
    <Tooltip title="back">
      <IconButton sx={{position : "absolute", top :"2rem", left : "2rem", bgcolor : "rgba(0,0,0,0.6)", 
          color : "#fff", "&:hover": {"backgroundColor": "black"}}}  onClick={navigateBack}>
        <KeyboardBackspaceIcon />
      </IconButton>
    </Tooltip>
  </>

  const GroupName = <>
    <Stack direction={"row"}>
      {isEdit? 
      <>
        <TextField value={groupNameUpdatedValue} onChange={(e)=>setGroupNameUpdatedValue(e.target.value)} />
        <IconButton onClick={handleGroupName}>
          <DoneIcon />
        </IconButton>
      </>
      :<>
        <Typography variant='h4'>{groupName}</Typography>
        <IconButton onClick={()=>setIsEdit(true)}><EditIcon/></IconButton>
      </>}
    </Stack>
  </>

  const ButtonGroup = 
  <>
    <Stack direction={{xs:"column-reverse", sm:"row"}} spacing={"1rem"} p={{xs : "0.5rem", sm:"1rem", md:"1rem 4rem"}} >
      <Button size='large' color="error" variant='contained' startIcon={<DeleteIcon />} 
        onClick={openConfirmDeleteHandler}>Delete Group</Button>
      <Button size="large" color="primary" variant="contained" startIcon={<AddIcon/>}
        onClick={openAddMemberHandler}>Add Member</Button>
    </Stack> 
  </>
  
  useEffect(()=>{
    setGroupName(chatId? (`Group Name-${chatId}`):(`Group Name`));
    setGroupNameUpdatedValue(chatId? (`Group Name-${chatId}`):(`Group Name`));

    return ()=>{
      setGroupName("");
      setGroupNameUpdatedValue("");
      setIsEdit(false);
    }
  },[chatId])

  return (
    <>
      <Grid container height={"100vh"} >

        <Grid item sx={{display : {xs : "none", sm: "block"}, backgroundColor : ivory}} sm={4} >
          <GroupList myGroups={sampleChats} chatId={chatId}/>
        </Grid>

        <Grid item xs={12} sm={8} sx={{
          display:"flex",flexDirection :"column",alignItems: "center", 
          position : "relative", padding :"1rem 3rem"}}>
            {IconBtns}
            {groupName && <>
              {GroupName}
              <Typography margin={"2rem"} alignSelf={"flex-start"} variant='body1'>
                Members
              </Typography>
              <Stack maxWidth={"45rem"} width={"100%"} boxSizing={"border-box"} 
                padding={{sm:"1rem", xs:"0", md: "1rem 4rem"}} spacing={"2rem"} 
                height={"50vh"} overflow={"auto"}>
                  {
                    sampleUsers.length > 0?(
                      sampleUsers.map((user)=>(
                        <UserItem key={user._id} user={user} isAdded 
                          handler={removeMemberHandler}
                          styling={{boxShadow:"0 0 0.5rem rgba(0,0,0,0.2)",padding:"1rem 2rem", borderradius:"1rem" }} />
                      ))
                    ):(<Typography textAlign={"center"}>No Members</Typography>)
                  }
              </Stack>
              {ButtonGroup}
            </>}
        </Grid>
        
        {isAddMember && (
          <>
            <Suspense fallback={<Backdrop open/>}>
              <AddMemberDialog />
            </Suspense> 
          </>
        )}

        {confirmDeleteDialog && (
        <>
          <Suspense fallback={<Backdrop open />}>
            <ConfirmDeleteDialogue open={confirmDeleteDialog} handleClose={closeConfirmDeleteHandler}
                              deleteHandler={deleteHandler} />
          </Suspense>
        </>)}
        <Drawer sx={{display : {xs:"block", sm:"none"}, backgroundColor : ivory }} open={isMobileMenuOpen} onClose={handleMobileClose}>
            <GroupList w={'50vw'} myGroups={sampleChats} chatId={chatId} />
        </Drawer>
      </Grid>
    </>
  )
}

const GroupList = ({w="100%", chatId, myGroups=[]})=>(
  <Stack width={w}>
    {myGroups.length > 0 ? (
      myGroups.map((group)=><GroupListItem key={group._id} group={group} chatId={chatId} />)
    ):(
      <Typography textAlign={'center'} padding="1rem">No Groups</Typography>
      )}
  </Stack>
);

const GroupListItem = memo(({group, chatId})=>{
  const {name, avatar, _id} = group;

  return (
    <Link to={`?group=${_id}`} onClick={(e)=>{
      if(chatId === _id){
        e.preventDefault()
      }
    }} >
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  )

})

export default Groups;