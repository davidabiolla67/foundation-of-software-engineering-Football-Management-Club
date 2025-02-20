import React, { useEffect, useState } from "react"; 
import { auth, db } from "./Firebase";
import { doc, getDoc } from "firebase/firestore";
import { Typography } from "@mui/material";
import stadiumBg from "../assets/images/stadium.jpg"; // Import background image

const HomePage = () => {
  const [userDetails, setuserDetails] = useState(null);
/*
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log("User logged in:", user);
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setuserDetails(docSnap.data());
          console.log("User data fetched:", docSnap.data());

        } else {
          console.log("User document does not exist");
        }
      } else {
        console.log("User is not logged in");
        setuserDetails(null);
      }
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []); // Empty dependency array ensures it runs only on mount
*/
  return (
    <div
      style={{
        backgroundImage: `url(${stadiumBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "400px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#F8F8F8",
        textShadow: "2px 2px 6px rgba(0,0,0,0.8)",
      }}
    >
      <Typography variant="h4" style={{ fontFamily: "Bebas Neue" }}>
        Welcome to Our Football Club
      </Typography>
      {userDetails && (
        <Typography variant="h6">
          Hello, {userDetails.name}!
        </Typography>
      )}
    </div>
  );
};

export default HomePage;
