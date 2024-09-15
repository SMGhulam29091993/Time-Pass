import { useFileHandler, useInputValidation, useStrongPassword } from "6pp";
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import { Avatar, Button, Container, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { VisuallyHiddenInput } from '../components/styles/StyledComponents';
import { config, server } from '../constants/config';
import { userExists } from '../redux/reducers/auth';
import { UsernameValidator } from '../utils/validator';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);

    const toggleLogin =()=>setIsLogin(!isLogin);

    const navigate = useNavigate();

    const name = useInputValidation("");
    const email= useInputValidation("")
    const username = useInputValidation("", UsernameValidator);
    const bio = useInputValidation("");
    const password = useStrongPassword();

    const avatar = useFileHandler("single");

    const dispatch = useDispatch();

    const handleLogin = async (e)=>{
        e.preventDefault()

        const userData = {
            email : email.value,
            password : password.value
        };

        try {
            const {data} = await axios.post(`${server}/api/v1/user/login-user`,userData,config);
            
            if(!data.success){
                toast.error(data?.response?.data?.message || "Something went wrong please try after sometime.")
                return;
            }
            dispatch(userExists(true));
            toast.success(data.message);
        } catch (error) {
            console.log(`Login Error : ${error}`);
            toast.error(error?.response?.data?.message || "Something went wrong please try after sometime.");
        }
    }

    const handleRegister = async (e)=>{
        e.preventDefault();

        const formData = new FormData();
        formData.append("avatar", avatar.file);
        formData.append("name", name.value);
        formData.append("username", username.value);
        formData.append("email", email.value);
        formData.append("password", password.value);
        formData.append("bio",bio.value);
     
        try {
            const {data} = await axios.post(`${server}/api/v1/user/register`,formData, {
                headers : {
                    "Content-Type" : "multipart/form-data"
                },
                withCredentials : true
            });
            if (!data.success){
                toast.error(data?.response?.data?.message || "Something went wrong please try after sometime.");
                return; 
            }
            // dispatch(userExists(true))
            // toast.success(data.message);
            navigate(`/verification-page/${data.user._id}`)

        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong please try after sometime.");
            return; 
        }
    }

  return (
    <div style={{backgroundImage : "linear-gradient(rgba(200,200,200,0.5),rgba(120,110,220,0.5))", height:"110vh"}}>
        <Container component={"main"} maxWidth="sm" sx={{
                                                    
                                                    display : "flex",
                                                    alignItems : "center",
                                                    justifyContent : "center",
                                                }}>
            <Paper 
                elevation={3} 
                sx={{
                    padding : 2,
                    margin : 2,
                    display : "flex",
                    flexDirection : "column",
                    alignItems : "center",
                    bgcolor : "inherit"                    
                }}>
                    {isLogin?
                        <>
                
                            <Typography variant='h4'>Login</Typography>
                            <form style={{marginTop:"0.5rem", width:"100%"}} onSubmit={handleLogin}>
                                <TextField required fullWidth label="Email"  margin='normal' 
                                    value={email.value} onChange={email.changeHandler} variant='outlined' />
                                
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
                            <form  style={{marginTop:"0.5rem", width:"100%"}} onSubmit={handleRegister}>
                                <Stack position={"relative"} width={"6rem"} margin={"auto"} >
                                
                                    <Avatar sx={{height:"6rem", width:"6rem", objectFit:"contain"}} 
                                        src={avatar.preview}/>
                                        
                                    <IconButton sx={{position:"absolute", bottom : "0", color:"#fff",
                                                    right:"0", bgcolor: "rgb(0,0,0,0.5)", ":hover": "rgb(0,0,0,0.7)"}} 
                                                    component="label">
                                        <>
                                            <CameraAltIcon />
                                            <VisuallyHiddenInput type='file' accept='image/.*' onChange={avatar.changeHandler} />
                                        </>
                                    </IconButton>
                                </Stack>
                                {avatar.error && (
                                    <Typography color={"error"} variant='caption' m={"0.5rem auto"} 
                                        width={"fit-content"} display={"block"}  >{avatar.error}</Typography>
                                )}
                                
                                <TextField required fullWidth label="Name" margin='none' sx={{padding : "0.3rem"}}
                                    value={name.value} onChange={name.changeHandler} variant='outlined'  />

                                <TextField required fullWidth label="Email"  margin='none' sx={{padding : "0.3rem"}}
                                    value={email.value} onChange={email.changeHandler} variant='outlined' />

                                <TextField required fullWidth label="Username" margin='none' sx={{padding : "0.3rem"}}
                                    value={username.value} onChange={username.changeHandler} variant='outlined' />
                                {username.error && (
                                    <Typography color={"error"} variant='caption'>{username.error}</Typography>
                                )}
                                <TextField required fullWidth label="Bio" margin='none' sx={{padding : "0.3rem"}}
                                    value={bio.value} onChange={bio.changeHandler} variant='outlined' />

                                <TextField required fullWidth label="Password" value={password.value} 
                                    sx={{padding : "0.3rem"}} onChange={password.changeHandler} 
                                    type='password' margin='none' variant='outlined' />
                                {password.error && (
                                    <Typography color={"error"} variant='caption'>{password.error}</Typography>
                                )}
                                <Button sx={{marginTop:"0.3rem"}} variant='contained' fullWidth
                                    color='primary' type='submit'>Register</Button>
                                <Typography textAlign={"center"} fontWeight={"bold"} m={"0.2rem"}>OR</Typography>
                                <Button variant='contained' fullWidth color='secondary' 
                                    onClick={toggleLogin}>Already a User? Login</Button>
                                
                            </form>                        
                        </>}
            </Paper>
        </Container>

    </div>
   
  )
}

export default Login