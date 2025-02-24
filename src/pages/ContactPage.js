import React, { useState } from "react";
import { Container, TextField, Button, Typography, Grid, Box, Alert, Card, CardContent } from "@mui/material";
import { LocationOn, Phone, Email, Language } from "@mui/icons-material";
import emailjs from "emailjs-com"; // Import EmailJS

const ContactPage = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  // States to handle success and error messages
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Update form state as user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission with EmailJS
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation: required fields must be filled
    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill in all required fields.");
      return;
    }

    // EmailJS credentials
    const serviceID = "service_fsxqku6"; 
    const templateID = "template_bw1iicf"; 
    const userID = "kiZ7FCV9y4kzva4qp";

    // Send email via EmailJS
    emailjs.send(serviceID, templateID, formData, userID)
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        setSuccess(true);
        setError("");
        // Clear form fields after successful submission
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
      })
      .catch((err) => {
        console.log("FAILED...", err);
        setError("Something went wrong. Please try again later.");
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