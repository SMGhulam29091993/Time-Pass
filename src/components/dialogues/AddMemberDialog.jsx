import { Button, Dialog, DialogTitle, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { sampleUsers } from '../../constants/SampleData'
import UserItem from '../Shared/UserItem'

const AddMemberDialog = ({addMember, isLoadingAddMember, chatId}) => {

    const [members, setMembers] = useState(sampleUsers);
    const [selectMembers, setSelectMembers] = useState([]);
  
    const selectMemberHandler = (id)=>{
      setSelectMembers((prev)=>(
        prev.includes(id)
        ?prev.filter((currElement)=>currElement !== id)
        : [...prev, id]
      ))
    };

    const closeHandler = ()=>{
        setSelectMembers([]);
        setMembers([]);
    }
    
    const addMemberSubmitHandler = ()=>{}
    
    return (
    <div>
        <Dialog open onClose={closeHandler}>
            <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
                <DialogTitle textAlign={"center"}>
                    Add Member
                </DialogTitle>
           
                <Stack spacing={"1rem"}>
                    {members.length > 0 ? (members.map((user)=>(
                        <UserItem key={user._id} user={user} handler={selectMemberHandler} 
                            isAdded={selectMembers.includes(user._id)} />
                    ))):(<Typography textAlign={"center"}>No Friends</Typography>)}
                </Stack>
                <Stack direction={"row"} alignItems={"center"} justifyContent={"space-evenly"}>
                    <Button color='error' variant='contained'onClick={closeHandler}>Cancel</Button>
                    <Button color='primary' variant='contained' 
                        onClick={addMemberSubmitHandler} disabled={isLoadingAddMember}>Submit</Button>
                </Stack>
            </Stack>
        </Dialog>
    </div>
  )
}

export default AddMemberDialog