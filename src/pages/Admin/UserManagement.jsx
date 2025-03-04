import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/Layout/AdminLayout'
import Table from '../../components/Shared/Table'
import { Avatar } from '@mui/material';
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
    renderCell : (params)=> (<Avatar alt={params.row.name} src={params.row.avatar} />),
  },
  {
    field: "name",
    headerName:"Name",
    headerClassName : "table-header",
    width:200,
  },
  {
    field: "email",
    headerName : "Email",
    headerClassName :"table-header",
    width : 200
  },
  {
    field: "username",
    headerName:"Username",
    headerClassName : "table-header",
    width:200,
  },
  {
    field: "friends",
    headerName:"Friends",
    headerClassName : "table-header",
    width:150,
  },
  {
    field: "groups",
    headerName:"Groups",
    headerClassName : "table-header",
    width:200,
  },
];

const UserManagement = () => {
  const [rows, setRows] = useState([]);

  useEffect(()=>{
    setRows(dashBoardData.users.map((user)=>({...user, id:user._id,  avatar:transformImage(user.avatar[0], 50)})))
  },[])

  return (
    <AdminLayout>
      <Table rows={rows} columns={columns} heading={"All Users"} />
    </AdminLayout>
  )
}


export default UserManagement