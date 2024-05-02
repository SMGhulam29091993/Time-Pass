import { useInputValidation } from '6pp';
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import React from 'react';
import { Navigate } from 'react-router-dom';


const isAdmin = true;

const AdminLogin = () => {

  const secretKey = useInputValidation();

  const submitHanlder = (e)=>{
    e.preventDefault();
  }

  if(isAdmin) return <Navigate to="/admin/dashboard" />

  return (
    <div style={{backgroundImage : "linear-gradient(rgba(200,200,200,0.5),rgba(120,110,220,0.5))", height:"100vh"}}>
        <Container component={"main"} maxWidth="sm" sx={{
                                                    display : "flex",
                                                    alignItems : "center",
                                                    justifyContent : "center",
                                                    padding : 4,
                                                }}>
            <Paper 
                elevation={3} 
                sx={{
                    padding : 4,
                    display : "flex",
                    flexDirection : "column",
                    alignItems : "center",
                    bgcolor : "inherit"                    
                }}>
                                    
                  <Typography variant='h4'>Admin Login</Typography>
                  <form style={{marginTop:"0.5rem", width:"100%"}} onSubmit={submitHanlder}>
                                                
                      <TextField required fullWidth  value={secretKey.value} onChange={secretKey.changeHandler}
                          label="Secret Key" type='password'  margin='normal' variant='outlined' />

                      <Button sx={{marginTop: "1rem"}} variant='contained' color='success' fullWidth
                          type='submit'>Login</Button>                          
                  </form>                                   
                   
            </Paper>
        </Container>

    </div>
  )
}

export default AdminLogin