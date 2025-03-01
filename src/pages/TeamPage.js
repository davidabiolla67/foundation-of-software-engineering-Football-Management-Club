// import { Container, Typography } from "@mui/material";

// const TeamPage = () => {
//   return (
//     <Container>
//       <Typography variant="h3">Our Team</Typography>
//       <Typography>Details about players and their stats.</Typography>
//     </Container>
//   );
// };

// export default TeamPage;

// ----=------------0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
import { Container, Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";
import player1 from "../assets/images/player1.jpg";
import player2 from "../assets/images/player2.jpg";

const players = [
  { name: "John Smith", position: "Striker", image: player1 },
  { name: "David Johnson", position: "Goalkeeper", image: player2 },
];

const TeamPage = () => {
  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>Our Team</Typography>
      <Grid container spacing={3}>
        {players.map((player, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card>
              <CardMedia component="img" height="250" image={player.image} alt={player.name} />
              <CardContent>
                <Typography variant="h5">{player.name}</Typography>
                <Typography variant="body1">{player.position}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TeamPage;

