import React, { useState } from 'react';
import { Button, Container, Paper, TextField, Typography } from "@mui/material";

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);

    const toggleLogin =()=>setIsLogin(false)
  return (
    <Container component={"main"} maxWidth="sx">
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
                        <form>
                            <TextField required fullWidth label="Username"  margin='normal' variant='outlined' />
                            <TextField required fullWidth 
                                label="Password" type='password'  margin='normal' variant='outlined' />
                            <Button sx={{marginTop: "1rem"}} variant='contained' color='primary' fullWidth
                                type='submit'>Login</Button>
                            <Typography textAlign={"center"} m={"1rem"} fontWeight={"bold"}>OR</Typography>
                            <Button  variant='contained' color='warning' onClick={toggleLogin}
                               fullWidth type='submit'>New here? Register</Button>
                        </form>
                    </>:<span>Register</span>}
        </Paper>
    </Container>
  )
}

export default Login