// import { AppBar, Toolbar, Typography, Button } from "@mui/material";
// import { Link } from "react-router-dom";

// const Header = () => {
//   return (
//     <AppBar position="static">
//       <Toolbar>
//         <Typography variant="h6" style={{ flexGrow: 1 }}>
//           Football Club
//         </Typography>
//         <Button color="inherit" component={Link} to="/">Home</Button>
//         <Button color="inherit" component={Link} to="/team">Team</Button>
//         <Button color="inherit" component={Link} to="/fixtures">Fixtures</Button>
//         <Button color="inherit" component={Link} to="/news">News</Button>
//         <Button color="inherit" component={Link} to="/contact">Contact</Button>
//         <Button color="inherit" component={Link} to="/login">Login</Button>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Header;

//...........................................................................................................................................................................

import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import clubLogo from "../assets/images/club-logo.jpg"; // Import logo

const Header = () => {
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
        <Button color="inherit" component={Link} to="/login">Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
