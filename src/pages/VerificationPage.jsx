import { Button, Container, Paper, TextField, Typography } from '@mui/material';
import axios from "axios";
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { server } from '../constants/config';
import { userExists } from '../redux/reducers/auth';

const VerificationPage = () => {
    const [otp, setOtp] = useState(''); 
    const [verifying, setVerifying] = useState(false);
    const [userOTP,setUserOTP] = useState("");

    const params = useParams();
    const userID = params.userID;

    const dispatch = useDispatch();

    const getOTP = async ()=>{
        try {
            const {data} = await axios.get(`${server}/api/v1/user/get-otp/${userID}`);
           
            if(!data.success){
                toast.error("No Otp Found");
            }
            setUserOTP(data.otp)
            
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(()=>{
        getOTP();

    }, [])

    const handleVerification = async (e) => {
        e.preventDefault();
        if(otp === userOTP){
            setTimeout(setVerifying(true), 2000);
            toast.success("Email Verified!!!");
        }
        setVerifying(false);
        
        dispatch(userExists(true));
    }

    return (
        <>
            <div style={{ backgroundImage: "linear-gradient(rgba(200,200,200,0.5),rgba(120,110,220,0.5))", height: "110vh" }}>
                <Container component={"main"} maxWidth="sm" sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <Paper elevation={3}
                        sx={{
                            padding: 2,
                            margin: 2,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            bgcolor: "inherit"
                        }}>
                        <Typography variant='h2'>Enter OTP</Typography>
                        <form style={{ marginTop: "0.5rem", width: "100%" }} onSubmit={handleVerification}>
                            <TextField
                                required
                                fullWidth
                                label="OTP"
                                margin='normal'
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)} // Corrected onChange handler
                                variant='outlined'
                            />

                            <Button sx={{ marginTop: "1rem" }} variant='contained' color='primary' fullWidth type='submit'>
                                {verifying? "Verifying... ": "Verify" }
                            </Button>
                        </form>
                    </Paper>
                </Container>
            </div>
        </>
    );
}

export default VerificationPage;