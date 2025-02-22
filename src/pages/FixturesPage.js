import React, { useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  Modal,
  Box
} from "@mui/material";

const fixturesData = [
  { id: 1, homeTeam: "Manchester United", awayTeam: "Chelsea", date: "2024-03-15", time: "18:00", venue: "Old Trafford", status: "upcoming" },
  { id: 2, homeTeam: "Barcelona", awayTeam: "Real Madrid", date: "2024-03-10", time: "20:00", venue: "Camp Nou", status: "completed", result: "3 - 2" },
  { id: 3, homeTeam: "Paris Saint-Germain", awayTeam: "Bayern Munich", date: "2024-03-12", time: "17:00", venue: "Parc des Princes", status: "live", liveScore: "2 - 1" },
  { id: 4, homeTeam: "Liverpool", awayTeam: "Arsenal", date: "2024-03-18", time: "19:30", venue: "Anfield", status: "upcoming" },
  { id: 5, homeTeam: "Juventus", awayTeam: "Inter Milan", date: "2024-03-09", time: "21:00", venue: "Allianz Stadium", status: "completed", result: "1 - 1" },
  { id: 6, homeTeam: "AC Milan", awayTeam: "Napoli", date: "2024-03-16", time: "20:45", venue: "San Siro", status: "upcoming" }
];

const FixturesPage = () => {
  const [fixtures, setFixtures] = useState(fixturesData);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedFixture, setSelectedFixture] = useState(null);

  const handleTeamChange = (e) => {
    setSelectedTeam(e.target.value);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const filteredFixtures = fixtures.filter((fixture) => {
    return (
      (selectedTeam === "" || fixture.homeTeam === selectedTeam || fixture.awayTeam === selectedTeam) &&
      (selectedDate === "" || fixture.date === selectedDate)
    );
  });

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Fixtures & Results
      </Typography>

      {/* Filters */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Filter by Team</InputLabel>
            <Select value={selectedTeam} label="Filter by Team" onChange={handleTeamChange}>
              <MenuItem value="">All Teams</MenuItem>
              {[...new Set(fixtures.map((f) => f.homeTeam).concat(fixtures.map((f) => f.awayTeam)))].map((team) => (
                <MenuItem key={team} value={team}>{team}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Filter by Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={selectedDate}
            onChange={handleDateChange}
          />
        </Grid>
      </Grid>

      {/* Fixture List */}
      <Grid container spacing={3}>
        {filteredFixtures.map((fixture) => (
          <Grid item xs={12} md={6} lg={4} key={fixture.id}>
            <Card
              sx={{
                borderLeft: fixture.status === "live" ? "4px solid red" : "none",
                cursor: "pointer",
                animation: fixture.status === "live" ? "blinker 1.5s linear infinite" : "none"
              }}
              onClick={() => setSelectedFixture(fixture)}
            >
              <CardContent>
                <Typography variant="h6">
                  {fixture.homeTeam} vs {fixture.awayTeam}
                </Typography>
                <Typography variant="body2">
                  {fixture.date} | {fixture.time}
                </Typography>
                <Typography variant="body2">Venue: {fixture.venue}</Typography>

                {fixture.status === "live" && <Chip label="LIVE" color="error" />}
                {fixture.status === "completed" && (
                  <Typography variant="h6" color="primary">
                    Result: {fixture.result}
                  </Typography>
                )}
                {fixture.status === "upcoming" && <Chip label="Upcoming" color="primary" />}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Match Modal */}
      <Modal
        open={Boolean(selectedFixture)}
        onClose={() => setSelectedFixture(null)}
        aria-labelledby="match-details-modal"
        aria-describedby="modal-showing-match-details"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4
          }}
        >
          {selectedFixture && (
            <>
              <Typography variant="h5">
                {selectedFixture.homeTeam} vs {selectedFixture.awayTeam}
              </Typography>
              <Typography>Date: {selectedFixture.date}</Typography>
              <Typography>Time: {selectedFixture.time}</Typography>
              <Typography>Venue: {selectedFixture.venue}</Typography>
              <Typography>Status: {selectedFixture.status}</Typography>
              {selectedFixture.status === "live" && <Typography color="error">Live Score: {selectedFixture.liveScore}</Typography>}
              {selectedFixture.status === "completed" && <Typography>Result: {selectedFixture.result}</Typography>}
            </>
          )}
        </Box>
      </Modal>

      <style>
        {`
          @keyframes blinker {
            50% { opacity: 0.5; }
          }
        `}
      </style>
    </Container>
  );
};

export default FixturesPage;














                  //First basic code below 00000000000000000000000000000000000000000000000000000000000000000000000000 
// import { Container, Typography } from "@mui/material";

// const FixturesPage = () => {
//   return (
//     <Container>
//       <Typography variant="h3">Fixtures & Results</Typography>
//       <Typography>Upcoming and past matches.</Typography>
//     </Container>
//   );
// };

// export default FixturesPage;
