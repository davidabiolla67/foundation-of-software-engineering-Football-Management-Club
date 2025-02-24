
import './TeamPage.css';
import { useState, useEffect } from "react";
import {  db } from "../pages/Firebase";
import { docs } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";







const TeamPage = () => {
  
  const [players, setPlayers] = useState([]);
 

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "playerinfo"));
        const playersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPlayers(playersList);
       
      
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    fetchPlayers();
  }, []);

 

console.log(players)





  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const openModal = (player) => {
    setSelectedPlayer(player);
  };

  const closeModal = () => {
    setSelectedPlayer(null);
  };

  return (
    <div className="team-page">
      <h1>Team Roster</h1>

      <div className="player-grid">
        {players.map((player) => (
          <div className="player-card" key={player.id} onClick={() => openModal(player)}>
            <img src={player.img} alt={player.name} className="player-image" />
            <h2>{player.name}</h2>
            <p><strong>Position:</strong> {player.position}</p>
            <p><strong>Jersey Number:</strong> #{player.jerseyNumber}</p>
          </div>
        ))}
      </div>

      {selectedPlayer && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>X</button>
            <img src={selectedPlayer.img} alt={selectedPlayer.name} className="modal-image" />
            <h2>{selectedPlayer.name}</h2>
            <p><strong>Position:</strong> {selectedPlayer.position}</p>
            <p><strong>Jersey Number:</strong> #{selectedPlayer.jerseyNumber}</p>
            <p><strong>Matches Played:</strong> {selectedPlayer.matchesPlayed}</p>
            <p><strong>Goals:</strong> {selectedPlayer.goals}</p>
            <p><strong>Assists:</strong> {selectedPlayer.assists}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamPage;














// statistic data UI below






// import React from 'react';
// import '../App.css';

// const players = [
//   {
//     id: 1,
//     name: 'John Doe',
//     position: 'Forward',
//     jerseyNumber: 9,
//     matchesPlayed: 25,
//     goals: 15,
//     assists: 7,
//     image: require('../assets/images/player1.jpg')
//   },
//   {
//     id: 2,
//     name: 'Mike Smith',
//     position: 'Midfielder',
//     jerseyNumber: 10,
//     matchesPlayed: 28,
//     goals: 8,
//     assists: 12,
//     image: require('../assets/images/player2.jpg')
//   },
//   {
//     id: 3,
//     name: 'Carlos Vega',
//     position: 'Defender',
//     jerseyNumber: 5,
//     matchesPlayed: 30,
//     goals: 3,
//     assists: 5,
//     image: require('../assets/images/player3.jpg')
//   },
//   {
//     id: 4,
//     name: 'Liam Johnson',
//     position: 'Goalkeeper',
//     jerseyNumber: 1,
//     matchesPlayed: 32,
//     goals: 0,
//     assists: 2,
//     image: require('../assets/images/player4.jpg')
//   },
//   {
//     id: 5,
//     name: 'David Clark',
//     position: 'Forward',
//     jerseyNumber: 11,
//     matchesPlayed: 26,
//     goals: 18,
//     assists: 4,
//     image: require('../assets/images/player5.jpg')
//   },
//   {
//     id: 6,
//     name: 'Nathan Lee',
//     position: 'Midfielder',
//     jerseyNumber: 7,
//     matchesPlayed: 29,
//     goals: 7,
//     assists: 10,
//     image: require('../assets/images/player6.jpg')
//   }
// ];

// const TeamPage = () => {
//   return (
//     <div className="team-page">
//       <h1 className="team-title">Team Roster</h1>
//       <div className="player-grid">
//         {players.map((player) => (
//           <div className="player-card" key={player.id}>
//             <img 
//               src={player.image} 
//               alt={player.name} 
//               className="player-image"
//             />
//             <h2 className="player-name">{player.name}</h2>
//             <p><strong>Position:</strong> {player.position}</p>
//             <p><strong>Jersey Number:</strong> #{player.jerseyNumber}</p>
//             <p><strong>Matches Played:</strong> {player.matchesPlayed}</p>
//             <p><strong>Goals:</strong> {player.goals}</p>
//             <p><strong>Assists:</strong> {player.assists}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TeamPage;
// 4444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444

// 2 player perfect cardbelow upper one is for 6 players
// import React from 'react';
// import '../App.css';

// const players = [
//   {
//     id: 1,
//     name: 'John Doe',
//     position: 'Forward',
//     jerseyNumber: 9,
//     matchesPlayed: 25,
//     goals: 15,
//     assists: 7,
//     image: require('../assets/images/player1.jpg')
//   },
//   {
//     id: 2,
//     name: 'Mike Smith',
//     position: 'Midfielder',
//     jerseyNumber: 10,
//     matchesPlayed: 28,
//     goals: 8,
//     assists: 12,
//     image: require('../assets/images/player2.jpg')
//   }
// ];

// const TeamPage = () => {
//   return (
//     <div className="team-page">
//       <h1 className="team-title">Team Roster</h1>
//       <div className="player-grid">
//         {players.map((player) => (
//           <div className="player-card" key={player.id}>
//             <img 
//               src={player.image} 
//               alt={player.name} 
//               className="player-image"
//             />
//             <h2 className="player-name">{player.name}</h2>
//             <p><strong>Position:</strong> {player.position}</p>
//             <p><strong>Jersey Number:</strong> #{player.jerseyNumber}</p>
//             <p><strong>Matches Played:</strong> {player.matchesPlayed}</p>
//             <p><strong>Goals:</strong> {player.goals}</p>
//             <p><strong>Assists:</strong> {player.assists}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TeamPage;















// oooooooooooooooooooooodfjadnfdsjgfoidshgidsjfoidsjvgopdshfidsjvokkdshjvfopdsvgdooooooooooooooofjoidsvoifdsnvoksfnvbkosdngvlksbnvkdbvjhdjbsfjlkbvkjfsbvkdavbjsfdhdakhfkjsakdsgfwqiojdgfdsifoqehfdkbvoidwhfhewifbfe kdscmnioqndhfijewrwogrewimvoiewfbnoiewijgirenvioewrnfefv




// import React from 'react';
// import '../App.css';

// const players = [
//   {
//     id: 1,
//     name: 'John Doe',
//     position: 'Forward',
//     jerseyNumber: 9,
//     matchesPlayed: 25,
//     goals: 15,
//     assists: 7,
//     image: require('../assets/images/player1.jpg')
//   },
//   {
//     id: 2,
//     name: 'Mike Smith',
//     position: 'Midfielder',
//     jerseyNumber: 10,
//     matchesPlayed: 28,
//     goals: 8,
//     assists: 12,
//     image: require('../assets/images/player2.jpg')
//   }
// ];

// const TeamPage = () => {
//   return (
//     <div className="team-page">
//       <h1>Team Roster</h1>
//       <div className="player-grid">
//         {players.map((player) => (
//           <div className="player-card" key={player.id}>
//             <img src={player.image} alt={player.name} className="player-image" />
//             <h2>{player.name}</h2>
//             <p><strong>Position:</strong> {player.position}</p>
//             <p><strong>Jersey Number:</strong> #{player.jerseyNumber}</p>
//             <p><strong>Matches Played:</strong> {player.matchesPlayed}</p>
//             <p><strong>Goals:</strong> {player.goals}</p>
//             <p><strong>Assists:</strong> {player.assists}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TeamPage;















// new new new new new new new new new mnew new new ne wnew8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888



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
// import { Container, Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";
// import player1 from "../assets/images/player1.jpg";
// import player2 from "../assets/images/player2.jpg";

// const players = [
//   { name: "John Smith", position: "Striker", image: player1 },
//   { name: "David Johnson", position: "Goalkeeper", image: player2 },
// ];

// const TeamPage = () => {
//   return (
//     <Container>
//       <Typography variant="h3" align="center" gutterBottom>Our Team</Typography>
//       <Grid container spacing={3}>
//         {players.map((player, index) => (
//           <Grid item xs={12} md={6} key={index}>
//             <Card>
//               <CardMedia component="img" height="250" image={player.image} alt={player.name} />
//               <CardContent>
//                 <Typography variant="h5">{player.name}</Typography>
//                 <Typography variant="body1">{player.position}</Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// };

// export default TeamPage;

