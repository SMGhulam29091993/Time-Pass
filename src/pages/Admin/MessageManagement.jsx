import React from 'react'
import AdminLayout from '../../components/Layout/AdminLayout'


const columns = [
  {
    field: "id",
    headerName:"ID",
    headerClassName : "table-header",
    width:200,
  },
  {
    field: "attachments",
    headerName:"Attachments",
    headerClassName : "table-header",
    width:200,
    renderCell : (params)=> (<Avatar alt={params.row.name} src={params.row.avatar} />),
  },
  {
    field: "contents",
    headerName:"Contents",
    headerClassName : "table-header",
    width:400,
  },
  {
    field: "sender",
    headerName:"Sent By",
    headerClassName : "table-header",
    width:200,
    renderCell : (params)=> (
    <Stack>
      <Avatar alt={params.row.sender.name} src={params.row.sender.avatar} />
      <span>{params.row.sender.name}</span>
    </Stack>
    )
  },
  {
    field: "chats",
    headerName:"Chats",
    headerClassName : "table-header",
    width:220,
  },
  {
    field: "groupChats",
    headerName:"Group Chats",
    headerClassName : "table-header",
    width:100,
  },
  {
    field: "createdAt",
    headerName:"Time",
    headerClassName : "table-header",
    width:250,
  },
];

const MessageManagement = () => {
  return (
    <AdminLayout>MessageManagement</AdminLayout>
  )
}

export default MessageManagement