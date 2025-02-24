import React, { useEffect, useState } from "react";
import { auth, db } from "./Firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Carousel from "react-material-ui-carousel"; // For Latest News Carousel
import stadiumBg from "../assets/images/stadium.jpg";
import player1 from "../assets/images/player1.jpg";
import player2 from "../assets/images/player2.jpg";
import player3 from "../assets/images/player3.jpg";
import latestNews1 from "../assets/images/LatestNews1.jpg";

// Custom Next Arrow Component
function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <Button
      onClick={onClick}
      sx={{
        position: "absolute",
        right: "10px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        color: "#fff",
        "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
      }}
    >
      Next
    </Button>
  );
}

// Custom Prev Arrow Component
function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <Button
      onClick={onClick}
      sx={{
        position: "absolute",
        left: "10px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        color: "#fff",
        "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
      }}
    >
      Prev
    </Button>
  );
}

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3, // Adjust the number of slides visible at once
  slidesToScroll: 1,
  arrows: true,
  draggable: true,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 960,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const HomePage = () => {
  const [userDetails, setUserDetails] = useState(null);

  // Featured Players Data
  const featuredPlayers = [
    { name: "John Doe", position: "Forward", goals: 15, img: player1 },
    { name: "Alex Smith", position: "Midfielder", goals: 12, img: player2 },
    { name: "Carlos Vega", position: "Defender", goals: 5, img: player3 },
  ];

  // Latest News Data
  const latestNews = [
    { title: "Unity FC Wins Local Derby", img: latestNews1 },
    { title: "New Midfielder Joins Unity FC", img: latestNews1 },
    { title: "Championship Qualifiers Announced", img: latestNews1 },
    { title: "Unity FC Prepares for Next Season", img: latestNews1 },
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

      {/* 👥 Featured Players Section as Carousel */}
      <Box sx={{ p: 4, backgroundColor: "#f9f9f9", position: "relative" }}>
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
        <Slider {...sliderSettings}>
          {featuredPlayers.map((player, index) => (
            <Box key={index} sx={{ padding: "0 10px" }}>
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
                    e.target.src =
                      "https://via.placeholder.com/200x150?text=No+Image";
                  }}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ color: "#003366", fontWeight: "bold" }}
                  >
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
            </Box>
          ))}
        </Slider>
      </Box>

      {/* 📰 Latest News Section as Carousel */}
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
        <Carousel
          autoPlay={true}
          interval={5000}
          indicators={true}
          navButtonsAlwaysVisible={true}
          sx={{ maxWidth: "800px", margin: "0 auto" }}
        >
          {latestNews.map((news, index) => (
            <Box key={index} sx={{ padding: "0 10px" }}>
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
                  image={news.img}
                  alt={news.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/400x200?text=News+Image";
                  }}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ color: "#003366", fontWeight: "bold" }}
                  >
                    {news.title}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Carousel>
      </Box>
    </div>
  );
};

export default HomePage;
