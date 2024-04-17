import { useInputValidation } from "6pp";
import { Button, Dialog, DialogTitle, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from 'react';
import { sampleUsers } from '../../constants/SampleData';
import UserItem from '../Shared/UserItem';

const NewGroups = () => {
  const groupName = useInputValidation();

  const [members, setMembers] = useState(sampleUsers);
  const [selectMembers, setSelectMembers] = useState([]);

  const selectMemberHandler = (id)=>{
    setSelectMembers((prev)=>(
      prev.includes(id)
      ?prev.filter((currElement)=>currElement !== id)
      : [...prev, id]
    ))
  };
  console.log(selectMembers);

  const submitHandler =()=>{};

  const closeHandler = ()=>{};

  return (
    <>
      <Dialog open onClose={closeHandler} >
        <Stack p={{xs:"1rem", sm:"2rem"}} width={"25rem"} spacing={"2rem"}>
          <DialogTitle textAlign={"center"} variant='h4'>New Group</DialogTitle>
          <TextField label="Group Name" value={groupName.value} onChange={groupName.changeHandler} />
          <Typography>Group Members</Typography>
          <Stack>
            {members.map((user)=>(
              <UserItem user={user} key={user._id} handler={selectMemberHandler} 
                isAdded={selectMembers.includes(user._id)} />
            ))}
          </Stack>
          <Stack direction={'row'} justifyContent={"space-evenly"}>
            <Button variant='contained' color='error'>Cancel</Button>
            <Button variant='contained' color='primary' onClick={submitHandler}>Create</Button>
          </Stack>
        </Stack>
      </Dialog>
    </>
  )
}

export default NewGroups;