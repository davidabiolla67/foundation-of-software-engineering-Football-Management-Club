import React, { useState } from "react";
import { Container, TextField, Button, Typography, Grid, Box, Alert, Card, CardContent } from "@mui/material";
import { LocationOn, Phone, Email, Language } from "@mui/icons-material";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill in all required fields.");
      return;
    }

    // Simulate successful form submission
    setSuccess(true);
    setError("");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h3" gutterBottom>
        Contact Us
      </Typography>

      <Grid container spacing={4}>
        {/* Contact Form */}
        <Grid item xs={12} md={7}>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={4}
              required
            />

            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mt: 2 }}>Message sent successfully!</Alert>}

            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
              Send Message
            </Button>
          </form>
        </Grid>

        {/* Contact Info with Better UI */}
        <Grid item xs={12} md={5}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" gutterBottom align="center" sx={{ color: "#1976d2", fontWeight: "bold" }}>
                Football Club
              </Typography>

              <Box display="flex" alignItems="center" mb={2}>
                <LocationOn color="primary" sx={{ mr: 1 }} />
                <Typography>123 Stadium Road, Football City</Typography>
              </Box>

              <Box display="flex" alignItems="center" mb={2}>
                <Phone color="primary" sx={{ mr: 1 }} />
                <Typography>+1 234 567 890</Typography>
              </Box>

              <Box display="flex" alignItems="center" mb={2}>
                <Email color="primary" sx={{ mr: 1 }} />
                <Typography>contact@unityfc.com</Typography>
              </Box>

              <Box display="flex" alignItems="center">
                <Language color="primary" sx={{ mr: 1 }} />
                <Typography>www.footballclub.com</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactPage;







                                              // first basic code in case of errors
// import { Container, Typography } from "@mui/material";

// const ContactPage = () => {
//   return (
//     <Container>
//       <Typography variant="h3">Contact Us</Typography>
//       <Typography>Email: contact@footballclub.com</Typography>
//     </Container>
//   );
// };

// export default ContactPage;
