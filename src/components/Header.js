import React, { useEffect, useState } from "react";
import { auth, db } from "../pages/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import clubLogo from "../assets/images/club-logo.jpg"; // Import logo

const Header = () => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log("User logged in:", user);
        try {
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);
          console.log(docSnap.data())
          if (docSnap.exists()) {
            console.log("i am in")
            setUserDetails(docSnap.data());
            console.log("User data fetched:", docSnap.data());
          } else {
            console.log("User document does not exist");
            setUserDetails(null);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUserDetails(null);
        }
      } else {
        console.log("User is not logged in");
        setUserDetails(null);
      }
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  async function handleLagout() {
    try{
    await auth.signOut()
    }
    catch(error){
      console.log(error.message)
    }
  }
  return (
    <AppBar position="static" style={{ background: "#003366" }}>
      <Toolbar>
        <img src={clubLogo} alt="Club Logo" style={{ height: "50px", marginRight: "20px" }} />
        <Typography variant="h5" style={{ flexGrow: 1, fontFamily: "Bebas Neue", letterSpacing: "2px" }}>
          Football Club
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/team">Team</Button>
        <Button color="inherit" component={Link} to="/fixtures">Fixtures</Button>
        <Button color="inherit" component={Link} to="/news">News</Button>
        <Button color="inherit" component={Link} to="/contact">Contact</Button>

        {/* Fixed Conditional Rendering */}
        {userDetails ? (
  <>
    <Button color="inherit">{"Hello  " + (userDetails.firstName )}</Button>
    <Button color="inherit" onClick={handleLagout}>Logout</Button>
  </>
) : (
  <Button color="inherit" component={Link} to="/login">Login</Button>
)}

      </Toolbar>
    </AppBar>
  );
};

export default Header;
