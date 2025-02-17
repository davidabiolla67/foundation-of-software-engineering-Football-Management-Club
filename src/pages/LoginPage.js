import { Container, TextField, Button, Typography } from "@mui/material";

const LoginPage = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h2">Login</Typography>
      <TextField fullWidth label="Email" margin="normal" />
      <TextField fullWidth label="Password" type="password" margin="normal" />
      <Button variant="contained" color="primary" fullWidth style={{ marginTop: "10px" }}>
        Login
      </Button>
      <Typography variant="body2" style={{ marginTop: "10px" }}>
        Don't have an account? <a href="/signup">Sign Up</a>
      </Typography>
    </Container>
  );
};

export default LoginPage;
