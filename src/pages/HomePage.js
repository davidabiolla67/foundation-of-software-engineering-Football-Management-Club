import React, { useEffect, useState } from "react";
import { auth, db } from "./Firebase";
import { doc, getDoc } from "firebase/firestore";
import { Typography, Button, Box, Grid, Card, CardContent, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import stadiumBg from "../assets/images/stadium.jpg"; // Background image
import player1 from "../assets/images/player1.jpg";
import player2 from "../assets/images/player2.jpg";
import player3 from "../assets/images/player3.jpg";
import latestNews1 from "../assets/images/LatestNews1.jpg";

const HomePage = () => {
  const [userDetails, setuserDetails] = useState(null);

  // ✅ Featured Players Data
  const featuredPlayers = [
    { name: "John Doe", position: "Forward", goals: 15, img: player1 },
    { name: "Alex Smith", position: "Midfielder", goals: 12, img: player2 },
    { name: "Carlos Vega", position: "Defender", goals: 5, img: player3 },
  ];

  // ✅ Latest News Data
  const latestNews = [
    { title: "Unity FC Wins Local Derby", img: latestNews1 },
    { title: "New Midfielder Joins Unity FC", img: "/assets/images/news2.jpg" },
  ];

  return (
    <div>
      {/* 🔥 Hero Banner Section */}
      <Box
        sx={{
          backgroundImage: `url(${stadiumBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "400px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#F8F8F8",
          textShadow: "2px 2px 6px rgba(0,0,0,0.8)",
          textAlign: "center",
        }}
      >
        <Typography variant="h3" sx={{ fontFamily: "Bebas Neue" }}>
          Welcome to Unity FC
        </Typography>
        <Typography variant="h5" sx={{ mt: 1 }}>
          "One Club. One Dream. Unity FC."
        </Typography>
        {userDetails && (
          <Typography variant="h6" sx={{ mt: 1 }}>
            Hello, {userDetails.name}!
          </Typography>
        )}
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/team"
            sx={{ mr: 2 }}
          >
            Meet the Team
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            component={Link}
            to="/news"
          >
            Latest News
          </Button>
        </Box>
      </Box>

      {/* 👥 Featured Players Section */}
      <Box sx={{ p: 4, backgroundColor: "#f9f9f9" }}>
        <Typography
          variant="h4"
          sx={{
            mb: 3,
            color: "#003366",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
          }}
        >
          ⭐ Featured Players
        </Typography>

        <Grid container spacing={3}>
          {featuredPlayers.map((player, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                  },
                  backgroundColor: "#ffffff",
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={player.img}
                  alt={player.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/200x150?text=No+Image";
                  }}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ color: "#003366", fontWeight: "bold" }}>
                    {player.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#555" }}>
                    Position: {player.position}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#555" }}>
                    Goals: {player.goals}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* 📰 Latest News Section */}
      <Box sx={{ p: 4, backgroundColor: "#f9f9f9" }}>
        <Typography
          variant="h4"
          sx={{
            mb: 3,
            color: "#003366",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
          }}
        >
          📰 Latest News
        </Typography>

        <Grid container spacing={3}>
          {latestNews.map((news, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card
                sx={{
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                  },
                  backgroundColor: "#ffffff",
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={news.img}
                  alt={news.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/400x200?text=News+Image";
                  }}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ color: "#003366", fontWeight: "bold" }}>
                    {news.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default HomePage;
