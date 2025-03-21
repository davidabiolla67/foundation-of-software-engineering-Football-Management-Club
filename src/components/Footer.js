
import React from "react";
import { Box, Typography, IconButton, Grid } from "@mui/material";
import { Facebook, Twitter, Instagram, Email, Phone, LocationOn } from "@mui/icons-material";
import logo from "../assets/images/club-logo1.jpg";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#0B3D91",
        color: "#fff",
        padding: "20px 40px",
        mt: 5,
      }}
    >
      <Grid container spacing={4} alignItems="center" justifyContent="space-between">
        {/* Club Logo & Name */}
        <Grid item xs={12} md={4} sx={{ textAlign: { xs: "center", md: "left" } }}>
          <img src={logo} alt="Unity FC Logo" style={{ height: "60px", borderRadius: "5px" }} />
          <Typography variant="h6" sx={{ mt: 1 }}>
            Unity FC
          </Typography>
          <Typography variant="body2">© 2025 Unity FC. All Rights Reserved.</Typography>
        </Grid>

        {/* Center Content – Club Motto */}
        <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            "One Club. One Dream. Unity FC."
          </Typography>
        </Grid>

        {/* Contact & Social Media */}
        <Grid item xs={12} md={4} sx={{ textAlign: { xs: "center", md: "right" } }}>
          <Typography variant="h6">Contact Us</Typography>
          <Box display="flex" alignItems="center" justifyContent={{ xs: "center", md: "flex-end" }}>
            <LocationOn sx={{ mr: 1 }} />
            <Typography>123 Stadium Road, Football City</Typography>
          </Box>
          <Box display="flex" alignItems="center" justifyContent={{ xs: "center", md: "flex-end" }}>
            <Email sx={{ mr: 1 }} />
            <Typography>contact@unityfc.com</Typography>
          </Box>
          <Box display="flex" alignItems="center" justifyContent={{ xs: "center", md: "flex-end" }}>
            <Phone sx={{ mr: 1 }} />
            <Typography>+1 234 567 890</Typography>
          </Box>

          {/* Social Media Icons */}
          <Box sx={{ mt: 1 }}>
            <IconButton href="https://facebook.com" target="_blank" sx={{ color: "#fff" }}>
              <Facebook />
            </IconButton>
            <IconButton href="https://instagram.com" target="_blank" sx={{ color: "#fff" }}>
              <Instagram />
            </IconButton>
            <IconButton href="https://twitter.com" target="_blank" sx={{ color: "#fff" }}>
              <Twitter />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
