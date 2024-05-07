import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/Layout/AdminLayout'
import Table from '../../components/Shared/Table';
import { dashBoardData } from '../../constants/SampleData';
import { fileFormat, transformImage } from '../../lib/features';
import moment from 'moment';
import { Avatar, Box, Stack } from '@mui/material';
import RenderAttachment from '../../components/Shared/RenderAttachment';


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
    renderCell: (params) => {
      const { attachments } = params.row;
      return attachments?.length > 0 ? (
        
        <Box display="flex" flexDirection="row" gap={2}>
          {console.log(dashBoardData.messages[1].attachments)}
          {attachments.map((attachment) => {
            
            const url = attachment.url;
            const file = fileFormat(url);
            return (
              <Box key={attachment.public_id}>
                <a href={url} download target="_blank" style={{ color: "black" }}>
                  {RenderAttachment(file, url)}
                </a>
              </Box>
            );
          })}
        </Box>
      ) : (
        "No Attachments"
      );
    }
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
    <Stack direction={"row"} spacing={"1rem"} alignItems={"center"} >
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
    renderCell : (params)=>(
      params.row.groupChats?"True":"False"
    )
  },
  {
    field: "createdAt",
    headerName:"Time",
    headerClassName : "table-header",
    width:250,
  },
];

const MessageManagement = () => {
  const [rows,setRows] = useState([]);
  
  useEffect(()=>{
    setRows(dashBoardData.messages.map((message)=>(
      {...message, id:message._id, sender:{
        name: message.sender.name,
        avatar : transformImage(message.sender.avatar, 50)
      }, createdAt : moment(message.createdAt).format("MMMM Do YYYY, h:mm:ss A")}
    )))
  },[])

  return (
    <AdminLayout>
      <Table rows={rows} columns={columns} heading={"All Messages"} rowHeight={200} />
    </AdminLayout>
  )
}

export default MessageManagement