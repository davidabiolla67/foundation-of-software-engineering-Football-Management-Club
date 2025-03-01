// import { Container, Typography } from "@mui/material";

// const Footer = () => {
//   return (
//     <Container style={{ textAlign: "center", padding: "20px", marginTop: "20px" }}>
//       <Typography variant="body2">&copy; 2025 Football Club. All Rights Reserved.</Typography>
//     </Container>
//   );
// };

// export default Footer;



// ---------------------------------------------------------------------------------------------------------------------------edited footer below

import { Container, Typography } from "@mui/material";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <Container style={{ textAlign: "center", padding: "20px", marginTop: "20px", background: "#111111", color: "#fff" }}>
      <Typography variant="body2">&copy; 2025 Football Club. All Rights Reserved.</Typography>
      <div style={{ marginTop: "10px" }}>
        <FaFacebook size={24} style={{ margin: "0 10px" }} />
        <FaInstagram size={24} style={{ margin: "0 10px" }} />
        <FaTwitter size={24} style={{ margin: "0 10px" }} />
      </div>
    </Container>
  );
};

export default Footer;
