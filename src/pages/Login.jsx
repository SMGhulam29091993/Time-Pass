import React, { useState } from 'react';
import { Avatar, Button, Container, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import {CameraAlt as CameraAltIcon} from "@mui/icons-material"
import { VisuallyHiddenInput } from '../components/styles/StyledComponents';
import { useFileHandler, useInputValidation, useStrongPassword } from "6pp";
import { UsernameValidator } from '../utils/validator';

const Login = () => {
    const [isLogin, setIsLogin] = useState(false);

    const toggleLogin =()=>setIsLogin(!isLogin);

    const name = useInputValidation("");
    const username = useInputValidation("", UsernameValidator);
    const bio = useInputValidation("");
    const password = useStrongPassword();

    const avatar = useFileHandler("single");

  return (
    <Container component={"main"} maxWidth="sm" sx={{
                                                        display : "flex",
                                                        alignItems : "center",
                                                        justifyContent : "center",
                                                   }}>
        <Paper 
            elevation={3} 
            sx={{
                padding : 4,
                margin : 2,
                display : "flex",
                flexDirection : "column",
                alignItems : "center",
            }}>
                {isLogin?
                    <>
           
                        <Typography variant='h4'>Login</Typography>
                        <form style={{marginTop:"1rem", width:"100%"}}>
                            <TextField required fullWidth label="Username"  margin='normal' 
                                value={username.value} onChange={username.changeHandler} variant='outlined' />
                            
                            <TextField required fullWidth  value={password.value} onChange={password.changeHandler}
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
                        <form  style={{marginTop:"1rem", width:"100%"}}>
                            <Stack position={"relative"} width={"6rem"} margin={"auto"} >
                            
                                <Avatar sx={{height:"6rem", width:"6rem", objectFit:"contain"}} 
                                    src={avatar.preview}/>
                                 
                                <IconButton sx={{position:"absolute", bottom : "0", color:"#fff",
                                                right:"0", bgcolor: "rgb(0,0,0,0.5)", ":hover": "rgb(0,0,0,0.7)"}} 
                                                component="label">
                                    <>
                                        <CameraAltIcon />
                                        <VisuallyHiddenInput type='file' onChange={avatar.changeHandler} />
                                    </>
                                </IconButton>
                            </Stack>
                            {avatar.error && (
                                <Typography color={"error"} variant='caption' m={"1rem auto"} 
                                    width={"fit-content"} display={"block"}  >{avatar.error}</Typography>
                            )}
                            
                            <TextField required fullWidth label="Name" margin='normal' 
                                value={name.value} onChange={name.changeHandler} variant='outlined'  />

                            <TextField required fullWidth label="Username" margin='normal' 
                                value={username.value} onChange={username.changeHandler} variant='outlined' />
                            {username.error && (
                                <Typography color={"error"} variant='caption'>{username.error}</Typography>
                            )}
                            <TextField required fullWidth label="Bio" margin='normal' 
                               value={bio.value} onChange={bio.changeHandler} variant='outlined' />

                            <TextField required fullWidth label="Password" value={password.value} 
                                onChange={password.changeHandler} type='password' margin='normal' variant='outlined' />
                            {password.error && (
                                <Typography color={"error"} variant='caption'>{password.error}</Typography>
                            )}
                            <Button sx={{marginTop:"0.5rem"}} variant='contained' fullWidth
                                color='primary' type='submit'>Register</Button>
                            <Typography textAlign={"center"} fontWeight={"bold"} m={"0.5rem"}>OR</Typography>
                            <Button variant='contained' fullWidth color='secondary' 
                                onClick={toggleLogin}>Already a User? Login</Button>
                            
                        </form>                        
                    </>}
        </Paper>
    </Container>
  )
}

export default Login