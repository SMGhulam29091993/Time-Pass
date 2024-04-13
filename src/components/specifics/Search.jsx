import React, { useState } from 'react';
import { Dialog, Stack, TextField, DialogTitle, InputAdornment, List, ListItem } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useInputValidation } from "6pp";
import UserItem from '../Shared/UserItem';
import { sampleUsers } from '../../constants/SampleData';


// const users = [1,2,3,4];

const Search = () => {
  const search = useInputValidation("");
  const [users,setUsers] = useState(sampleUsers);

  let isLoadingSendFriendRequest = false;

  const addFriendHandler = (id)=>{
    console.log(id);
  }

  return (
    <Dialog open>
      <Stack padding={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField label="" value={search.value} onChange={search.changeHandler} variant='outlined' size='small'
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon/>
                </InputAdornment>
              )
        }} />
        <List>
          {users.map((user,i)=>(
           <UserItem user={user} key={user._id} handler={addFriendHandler} handlerIsLoading={isLoadingSendFriendRequest}/>
          ))}
        </List>
      </Stack>
    </Dialog>
  )
}

export default Search