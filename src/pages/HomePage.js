// 

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------after photo

import { Typography } from "@mui/material";
import stadiumBg from "../assets/images/stadium.jpg"; // Import background image

const HomePage = () => {
  return (
    <div style={{
      backgroundImage: `url(${stadiumBg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "400px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#F8F8F8",
      textShadow: "2px 2px 6px rgba(0,0,0,0.8)"
    }}>
      <Typography variant="h4" style={{ fontFamily: "Bebas Neue" }}>
        Welcome to Our Football Club
      </Typography>
    </div>
  );
};

export default HomePage;
