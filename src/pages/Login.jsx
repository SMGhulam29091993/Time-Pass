import React, { useState } from 'react';
import { Button, Container, Paper, TextField, Typography } from "@mui/material";

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);

    const toggleLogin =()=>setIsLogin(!isLogin)
  return (
    <Container component={"main"} maxWidth="xs" sx={{
                                                        height : "100vh", 
                                                        display : "flex",
                                                        alignItems : "center",
                                                        justifyContent : "center"    }}>
        <Paper 
            elevation={3} 
            sx={{
                padding : 4,
                margin : 2,
                display : "flex",
                flexDirection : "column",
                alignItems : "center"
            }}>
                {isLogin?
                    <>
                        <Typography variant='h4'>Login</Typography>
                        <form style={{marginTop:"1rem", width:"100%"}}>
                            <TextField required fullWidth label="Username"  margin='normal' variant='outlined' />
                            <TextField required fullWidth 
                                label="Password" type='password'  margin='normal' variant='outlined' />
                            <Button sx={{marginTop: "1rem"}} variant='contained' color='primary' fullWidth
                                type='submit'>Login</Button>
                            <Typography textAlign={"center"} m={"1rem"} fontWeight={"bold"}>OR</Typography>
                            <Button  variant='contained' color='secondary' onClick={toggleLogin}
                               fullWidth type='submit'>New here? Register</Button>
                        </form>
                    </>
                    :<>
                        <Typography variant='h4'>Register</Typography>
                        <form>
                            <TextField required fullWidth label="Name" margin='normal' variant='outlined' />
                            <TextField required fullWidth label="Username" margin='normal' variant='outlined' />
                            <TextField required fullWidth label="Bio" margin='normal' variant='outlined' />
                            <TextField required fullWidth label="Password" 
                                type='password' margin='normal' variant='outlined' />
                            <Button sx={{marginTop:"1rem"}} variant='contained' fullWidth
                                color='primary' type='submit'>Register</Button>
                            <Typography textAlign={"center"} fontWeight={"bold"} m={"1rem"}>OR</Typography>
                            <Button variant='contained' fullWidth color='secondary' 
                                onClick={toggleLogin}>Already a User? Login</Button>
                            
                        </form>
                    </>}
        </Paper>
    </Container>
  )
}

export default Login