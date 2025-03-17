import React, { useState, useEffect } from "react";
import { Typography, Grid, TextField, Box, Modal, CardContent, Button, IconButton, TextareaAutosize, MenuItem, Select, FormControl, InputLabel, Badge, Snackbar, Alert } from "@mui/material";
import { ThumbUp, Facebook, Twitter, LinkedIn, Whatshot, Delete } from "@mui/icons-material";

// Import Images
import LatestImage1 from "../assets/images/LatestNews1.jpg";
import LatestImage2 from "../assets/images/LatestNews2.jpg";
import player3 from "../assets/images/player3.jpg";

const newsData = [
  {
    id: 1,
    title: "Unity FC Wins Local Derby",
    summary: "Unity FC secured a thrilling victory in the local derby, marking an important milestone for the season.",
    image: LatestImage1,
    content: "Full details of the match, including player performances and post-match reactions.",
    publishedDate: "2025-02-20",
    likes: 5,
    comments: [{ text: "Great match!", user: "user1" }, { text: "What a win!", user: "user2" }],
    likedByUser: false
  },
  {
    id: 2,
    title: "New Midfielder Joins Unity FC",
    summary: "Unity FC welcomes a new midfielder, boosting the squad for the upcoming fixtures.",
    image: LatestImage2,
    content: "Background of the new player and what fans can expect this season.",
    publishedDate: "2025-02-18",
    likes: 10,
    comments: [{ text: "Exciting signing!", user: "user3" }],
    likedByUser: false
  },
  {
    id: 3,
    title: "Coach Extends Contract Until 2027",
    summary: "Head Coach signs a new deal, promising continued development and success.",
    image: player3,
    content: "Insights into the coach’s vision and plans for Unity FC.",
    publishedDate: "2025-02-15",
    likes: 3,
    comments: [],
    likedByUser: false
  }
];

const NewsPage = () => {
  const [newsList, setNewsList] = useState(newsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNews, setSelectedNews] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [sortOrder, setSortOrder] = useState("Newest");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    setCurrentUser(storedUser);
    setIsLoggedIn(!!storedUser);
  }, []);

  useEffect(() => {
    sortNews(sortOrder);
  }, [sortOrder]);

  const sortNews = (order) => {
    let sortedNews = [...newsList];
    if (order === "Newest") {
      sortedNews.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
    } else if (order === "Oldest") {
      sortedNews.sort((a, b) => new Date(a.publishedDate) - new Date(b.publishedDate));
    } else if (order === "Most Liked") {
      sortedNews.sort((a, b) => b.likes - a.likes);
    }
    setNewsList(sortedNews);
  };

  const handleLike = (newsId) => {
    if (!isLoggedIn) {
      triggerSnackbar("Please log in to like this post.");
      return;
    }

    const updatedNews = newsList.map((news) => {
      if (news.id === newsId) {
        const liked = !news.likedByUser;
        return {
          ...news,
          likes: liked ? news.likes + 1 : news.likes - 1,
          likedByUser: liked
        };
      }
      return news;
    });
    setNewsList(updatedNews);
    if (selectedNews && selectedNews.id === newsId) {
      setSelectedNews(updatedNews.find((n) => n.id === newsId));
    }
  };

  const handleAddComment = () => {
    if (!isLoggedIn) {
      triggerSnackbar("Please log in to add a comment.");
      return;
    }
    if (!commentText.trim()) return;

    const updatedNews = newsList.map((news) =>
      news.id === selectedNews.id
        ? { ...news, comments: [...news.comments, { text: commentText, user: currentUser }] }
        : news
    );
    setNewsList(updatedNews);
    setSelectedNews(updatedNews.find((n) => n.id === selectedNews.id));
    setCommentText("");
  };

  const handleDeleteComment = (commentIndex) => {
    const updatedNews = newsList.map((news) => {
      if (news.id === selectedNews.id) {
        const updatedComments = news.comments.filter((_, index) => index !== commentIndex);
        return { ...news, comments: updatedComments };
      }
      return news;
    });
    setNewsList(updatedNews);
    setSelectedNews(updatedNews.find((n) => n.id === selectedNews.id));
  };

  const triggerSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const filteredNews = newsList.filter((news) =>
    news.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3" sx={{ mb: 2, color: "#003366", fontWeight: "bold" }}>
        Latest News
      </Typography>

      <TextField
        label="Search News"
        variant="outlined"
        fullWidth
        sx={{ mb: 3 }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <FormControl sx={{ mb: 3, minWidth: 200 }}>
        <InputLabel>Sort By</InputLabel>
        <Select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          label="Sort By"
        >
          <MenuItem value="Newest">Newest First</MenuItem>
          <MenuItem value="Oldest">Oldest First</MenuItem>
          <MenuItem value="Most Liked">Most Liked</MenuItem>
        </Select>
      </FormControl>

      <Grid container spacing={3}>
        {filteredNews.map((news) => (
          <Grid item xs={12} md={4} key={news.id}>
            <Badge
              color="secondary"
              badgeContent={<Whatshot />}
              invisible={news.likes < 5}
            >
              <Box
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "0.3s",
                  "&:hover": { boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }
                }}
                onClick={() => setSelectedNews(news)}
              >
                <img
                  src={news.image}
                  alt={news.title}
                  style={{ width: "100%", height: "180px", objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ color: "#003366", fontWeight: "bold" }}>
                    {news.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#555" }}>
                    {news.summary}
                  </Typography>
                  <Typography variant="caption" sx={{ display: "block", mt: 1, color: "#888" }}>
                    Published on: {news.publishedDate}
                  </Typography>
                </CardContent>
              </Box>
            </Badge>
          </Grid>
        ))}
      </Grid>

      {filteredNews.length === 0 && (
        <Typography variant="h6" sx={{ mt: 3, color: "#888" }}>
          No news articles found.
        </Typography>
      )}

      <Modal open={!!selectedNews} onClose={() => setSelectedNews(null)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxWidth: "800px",
            maxHeight: "90vh",
            overflowY: "auto",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2
          }}
        >
          {selectedNews && (
            <>
              <Typography variant="h5" sx={{ mb: 2, color: "#003366", fontWeight: "bold" }}>
                {selectedNews.title}
              </Typography>
              <img
                src={selectedNews.image}
                alt={selectedNews.title}
                style={{ width: "100%", height: "auto", borderRadius: "8px", maxHeight: "400px", objectFit: "contain" }}
              />
              <CardContent>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  {selectedNews.content}
                </Typography>
                <Typography variant="caption" sx={{ display: "block", mt: 1, color: "#888" }}>
                  Published on: {selectedNews.publishedDate}
                </Typography>

                <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 2 }}>
                  <IconButton onClick={() => handleLike(selectedNews.id)} color="primary">
                    <ThumbUp color={selectedNews.likedByUser ? "success" : "inherit"} /> {selectedNews.likes}
                  </IconButton>
                  <IconButton>
                    <Facebook />
                  </IconButton>
                  <IconButton>
                    <Twitter />
                  </IconButton>
                  <IconButton>
                    <LinkedIn />
                  </IconButton>
                </Box>

                <Box sx={{ mt: 3 }}>
                  <Typography variant="h6">Comments</Typography>
                  {selectedNews.comments.length === 0 ? (
                    <Typography variant="body2" sx={{ color: "#888" }}>
                      No comments yet.
                    </Typography>
                  ) : (
                    selectedNews.comments.map((comment, index) => (
                      <Box key={index} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 1 }}>
                        <Typography variant="body2">• {comment.text}</Typography>
                        {comment.user === currentUser && (
                          <IconButton size="small" onClick={() => handleDeleteComment(index)}>
                            <Delete fontSize="small" />
                          </IconButton>
                        )}
                      </Box>
                    ))
                  )}

                  <TextareaAutosize
                    minRows={3}
                    placeholder={isLoggedIn ? "Add a comment..." : "Log in to comment..."}
                    style={{ width: "100%", marginTop: "10px", padding: "8px" }}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    disabled={!isLoggedIn}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddComment}
                    sx={{ mt: 1 }}
                    disabled={!isLoggedIn}
                  >
                    Post Comment
                  </Button>
                </Box>
              </CardContent>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setSelectedNews(null)}
                sx={{ mt: 2 }}
              >
                Close
              </Button>
            </>
          )}
        </Box>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity="warning" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default NewsPage;