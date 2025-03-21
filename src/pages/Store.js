import React, { useState } from "react";
import { Card, CardMedia, CardContent, Typography, Button, Grid, Container, Box, IconButton, Badge, MenuItem, Select, TextField } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const addToCart = (product) => {
    if (product.stock === 0) return;
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, amount) => {
    setCart(cart.map((item) => item.id === productId ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item));
  };

  const toggleWishlist = (product) => {
    if (wishlist.some(item => item.id === product.id)) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" gutterBottom>Club Store</Typography>
        <Badge badgeContent={totalItems} color="primary">
          <ShoppingCartIcon fontSize="large" />
        </Badge>
      </Box>

      <Grid container spacing={3}>
        {products.map((product) => (
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
      
      {/* Cart Summary */}
      <Box mt={4} p={3} sx={{ bgcolor: "#f5f5f5", borderRadius: 2, boxShadow: 2 }}>
        <Typography variant="h5">Cart Summary</Typography>
        {cart.length === 0 ? (
          <Typography variant="body1" sx={{ mt: 1, color: "gray" }}>Your cart is empty.</Typography>
        ) : (
          cart.map((item) => (
            <Box key={item.id} display="flex" alignItems="center" justifyContent="space-between" sx={{ my: 1, p: 2, bgcolor: "white", borderRadius: 1, boxShadow: 1 }}>
              <Typography variant="body1">{item.name} (${item.price} x {item.quantity})</Typography>
              <Box>
                <IconButton onClick={() => updateQuantity(item.id, -1)}>
                  <RemoveCircleOutlineIcon />
                </IconButton>
                <IconButton onClick={() => updateQuantity(item.id, 1)}>
                  <AddCircleOutlineIcon />
                </IconButton>
                <IconButton onClick={() => removeFromCart(item.id)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </Box>
            </Box>
          ))
        )}
        <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>Total Price: ${totalPrice}</Typography>
        {cart.length > 0 && (
          <Button 
            variant="contained" 
            color="success" 
            fullWidth 
            sx={{ mt: 2 }} 
            onClick={() => navigate("/checkout", { state: { cart } })}
          >
            Proceed to Checkout
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default Store;