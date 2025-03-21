import React, { useState } from "react";
import { Card, CardMedia, CardContent, Typography, Button, Grid, Container, Box, IconButton, Badge, MenuItem, Select, TextField } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import homeJersey from "../assets/images/home_jersey.jpg";
import awayJersey from "../assets/images/away_jersey.jpg";
import trainingKit from "../assets/images/tshirt.jpg";

const products = [
  { id: 1, name: "Home Jersey", price: 30, category: "Jersey", stock: 10, image: homeJersey },
  { id: 2, name: "Away Jersey", price: 35, category: "Jersey", stock: 0, image: awayJersey },
  { id: 3, name: "Training Kit", price: 25, category: "Training", stock: 15, image: trainingKit }
];


const Store = () => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");

  const addToCart = (product) => {
    if (product.stock === 0) return;
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(cart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const toggleWishlist = (product) => {
    if (wishlist.some(item => item.id === product.id)) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const filterProducts = () => {
    let filtered = products;
    if (category !== "All") {
      filtered = filtered.filter((product) => product.category === category);
    }
    if (search) {
      filtered = filtered.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (sort === "low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
      filtered.sort((a, b) => b.price - a.price);
    }
    return filtered;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" gutterBottom>Club Store</Typography>
        <Badge badgeContent={cart.length} color="primary">
          <ShoppingCartIcon fontSize="large" />
        </Badge>
      </Box>

      {/* Filters & Search */}
      <Box display="flex" gap={2} sx={{ mb: 3 }}>
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          <MenuItem value="All">All Categories</MenuItem>
          <MenuItem value="Jersey">Jerseys</MenuItem>
          <MenuItem value="Training">Training Kits</MenuItem>
        </Select>
        <Select value={sort} onChange={(e) => setSort(e.target.value)}>
          <MenuItem value="">Sort by</MenuItem>
          <MenuItem value="low">Price: Low to High</MenuItem>
          <MenuItem value="high">Price: High to Low</MenuItem>
        </Select>
        <TextField placeholder="Search products..." fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
      </Box>

      <Grid container spacing={3}>
        {filterProducts().map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ boxShadow: 3, borderRadius: 2, transition: "0.3s", '&:hover': { boxShadow: 6 } }}>
              <CardMedia
                component="img"
                height="250"
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>{product.name}</Typography>
                <Typography variant="body1" color="text.secondary">${product.price}</Typography>
                <Typography variant="body2" color={product.stock > 0 ? "green" : "red"}>{product.stock > 0 ? "In Stock" : "Out of Stock"}</Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth 
                  sx={{ mt: 2, fontWeight: "bold", borderRadius: 1 }}
                  onClick={() => addToCart(product)}
                  disabled={product.stock === 0}
                >
                  Add to Cart
                </Button>
                <IconButton sx={{ mt: 1 }} onClick={() => toggleWishlist(product)}>
                  {wishlist.some(item => item.id === product.id) ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Store;