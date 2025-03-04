import { Avatar, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/Layout/AdminLayout';
import AvatarCard from '../../components/Shared/AvatarCard';
import Table from '../../components/Shared/Table';
import { dashBoardData } from '../../constants/SampleData';
import { transformImage } from '../../lib/features';


const columns = [
  {
    field: "id",
    headerName:"ID",
    headerClassName : "table-header",
    width:200,
  },
  {
    field: "avatar",
    headerName:"Avatar",
    headerClassName : "table-header",
    width:150,
    renderCell : (params)=> (<AvatarCard avatar={params.row.avatar} />),
  },
  {
    field: "name",
    headerName:"Name",
    headerClassName : "table-header",
    width:300,
  },
  {
    field: "totalMembers",
    headerName:"Total Members",
    headerClassName : "table-header",
    width:120,
  },
  {
    field: "members",
    headerName:"Members",
    headerClassName : "table-header",
    width:400,
    renderCell :(params)=>(
      <AvatarCard max={100} avatar={params.row.members}  />
    )
  },
  {
    field: "totalMessages",
    headerName:"Total Messages",
    headerClassName : "table-header",
    width:200,
  },
  {
    field: "creator",
    headerName:"Created By",
    headerClassName : "table-header",
    width:250,
    renderCell: (params)=>(
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <Avatar alt={params.row.creator.name} src={params.row.creator.avatar} />
        <span>{params.row.creator.name}</span>
      </Stack>
    ),
  },
];

const ChatManagement = () => {
  const [rows, setRows] = useState([]);

  useEffect(()=>{
    setRows(dashBoardData.chats.map((chat)=>(
      {...chat, id:chat._id, avatar : chat.avatar.map((i)=>transformImage(i,50)), 
        members:chat.members.map((j)=>transformImage(j.avatar, 50)),
        creator: {
          name : chat.creator.name,
          avatar : transformImage(chat.creator.avatar,50)
        }
      }
    )))
  },[])

  return (
    <AdminLayout>
      <Table rows={rows} columns={columns} heading={"All Chats"} />
    </AdminLayout>
  )
}

export default ChatManagement