import { Container, TextField, Button, Typography } from "@mui/material";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./Firebase";
import { setDoc, doc } from "firebase/firestore";
import React from "react";
import { toast } from "react-toastify";

const SignupPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log("User registered:", user);
      toast.success("user Registered Successfully",{
        position: "top-center"
      })
      if(user){
        await setDoc(doc(db, "Users", user.uid),{
          email: user.email,
          firstName: firstName, 
          lastName: lastName
        });
      }
    } catch (error) {
      console.error("Registration error:", error.message);
      const cleanMessage = error.message.replace(/^Firebase:\s/, '');
      toast.error( cleanMessage,{
        position: "top-center"
      })                       
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h2" align="center">Sign Up</Typography>
      <form onSubmit={handleRegister}>
        <TextField
          fullWidth
          label="First Name"
          margin="normal"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          fullWidth
          label="Last Name"
          margin="normal"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          style={{ marginTop: "10px" }}
        >
          Sign Up
        </Button>
      </form>
      <Typography variant="body2" align="center" style={{ marginTop: "10px" }}>
        Already have an account? <a href="/login">Login</a>
      </Typography>
    </Container>
  );
};

export default SignupPage;
