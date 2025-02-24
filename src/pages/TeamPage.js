import "./TeamPage.css";
import { useState, useEffect } from "react";
import { db } from "../pages/Firebase";
import { collection, getDocs } from "firebase/firestore";


const TeamPage = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

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

  console.log(players); // Debugging: Ensure data is being fetched

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
