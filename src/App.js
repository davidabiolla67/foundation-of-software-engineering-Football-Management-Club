import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import TeamPage from "./pages/TeamPage";
import FixturesPage from "./pages/FixturesPage";
import NewsPage from "./pages/NewsPage";
import ContactPage from "./pages/ContactPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "@mui/material";
import { useState, useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from "./pages/Firebase";

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        return () => unsubscribe(); // Cleanup function
    }, []);

    return (
        <Router>
            <Header />
            <Container>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    {/* Pass the `user` state to LoginPage */}
                    <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/team" element={<TeamPage />} />
                    <Route path="/fixtures" element={<FixturesPage />} />
                    <Route path="/news" element={<NewsPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                </Routes>
                <ToastContainer />
            </Container>
            <Footer />
        </Router>
    );
}

export default App;
