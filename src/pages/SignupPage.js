import { Container, TextField, Button, Typography } from "@mui/material";

const SignupPage = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h2">Sign Up</Typography>
      <TextField fullWidth label="Email" margin="normal" />
      <TextField fullWidth label="Password" type="password" margin="normal" />
      <Button variant="contained" color="primary" fullWidth style={{ marginTop: "10px" }}>
        Sign Up
      </Button>
      <Typography variant="body2" style={{ marginTop: "10px" }}>
        Already have an account? <a href="/login">Login</a>
      </Typography>
    </Container>
  );
};

export default SignupPage;
