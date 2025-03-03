import React, { useEffect, useState } from "react";
import { auth, db } from "../pages/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import clubLogo from "../assets/images/club-logo1.jpg"; 

const Header = () => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log("User logged in:", user);
        try {
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserDetails(docSnap.data());
          } else {
            setUserDetails(null);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUserDetails(null);
        }
      } else {
        setUserDetails(null);
      }
    });
   
    return () => unsubscribe();
    
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error.message);
    }
  }
 
  return (
    <AppBar className="AppBar" position="static" style={{ background: "#003366" }}>
      <Toolbar>
        <img
          src={clubLogo}
          alt="Club Logo"
          style={{ height: "50px", marginRight: "20px" }}
        />

        <Typography
          variant="h5"
          style={{
            flexGrow: 1,
            fontFamily: "Bebas Neue",
            letterSpacing: "2px",
          }}
        >
          Unity Football Club
        </Typography>

        {/* Navbar Links with Scale on Hover */}
        {["Home", "Team", "Fixtures", "News", "Contact"].map((item, index) => (
          <Button
            key={index}
            color="inherit"
            component={Link}
            to={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
            sx={{
              transition: "transform 0.2s ease, color 0.2s ease",
              "&:hover": {
                transform: "scale(1.2)", // Scale effect
                color: "#FFD700", // Optional hover color
              },
            }}
          >
            {item}
          </Button>
        ))}

        {/* Conditional Rendering for Login/Logout */}
        {userDetails ? (
          <>
           <Button
              color="inherit"
              sx={{
                transition: "transform 0.2s ease",
                "&:hover": { transform: "scale(1.2)", color: "#FFD700" },
              }}
            >
             Store
            </Button>


            <Button
              color="inherit"
              sx={{
                transition: "transform 0.2s ease",
                "&:hover": { transform: "scale(1.2)", color: "#FFD700" },
              }}
            >
              {"Hello  " + userDetails.firstName}
            </Button>
            <Button
              color="inherit"
              onClick={handleLogout}
              sx={{
                transition: "transform 0.2s ease",
                "&:hover": { transform: "scale(1.2)", color: "#FFD700" },
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <Button
            color="inherit"
            component={Link}
            to="/login"
            sx={{
              transition: "transform 0.2s ease",
              "&:hover": { transform: "scale(1.2)", color: "#FFD700" },
            }}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
