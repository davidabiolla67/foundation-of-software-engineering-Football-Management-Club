import { Container, TextField, Button, Typography } from "@mui/material";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./Firebase";
import React from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; 

const LoginPage = () => {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const navigate = useNavigate();  
      const handleLogin = async (e) => {
        e.preventDefault();
        try {
        await signInWithEmailAndPassword(auth, Email, Password);
        toast.success("User logged in successfully", {
          position: "top-center",
          autoClose: 1000,
        });
   

        setTimeout(() => {
          // Navigate to the home page after the delay
          navigate("/");
        }, 2000);  // Delay in milliseconds (1.5 seconds)
      

        console.log("user logging in successfully")
        } catch (error) {
          console.error("Login error:", error.message);
          const cleanMessage = error.message.replace(/^Firebase:\s/, '');
          let bleachedmessage = cleanMessage.split(' ')[1].replace(/[()]/g, '').replace(/^auth\//, '');

          toast.error( bleachedmessage,{
            position: "top-center"
          })                       
        }
      };
    
  
  return (
    <Container maxWidth="sm">
      <form >
      <Typography variant="h2">Login</Typography>
      <TextField fullWidth label="Email" margin="normal" value={Email} onChange={(e)=>setEmail(e.target.value)} />
      <TextField fullWidth label="Password" type="password" margin="normal"  value={Password} onChange={(e)=>setPassword(e.target.value)} />
      <Button variant="contained" color="primary" fullWidth style={{ marginTop: "10px" }} onClick={handleLogin}>
        Login
      </Button>
      <Typography variant="body2" style={{ marginTop: "10px" }}>
        Don't have an account? <a href="/signup">Sign Up</a>
      </Typography>
      </form>
    </Container>
  );
};

export default LoginPage;
