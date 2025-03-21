import React, { useState } from "react";
import { Card, CardMedia, CardContent, Typography, Button, Grid, Container, Box } from "@mui/material";

// Sample T-shirt products
const products = [
  { id: 1, name: "Home Jersey", price: 30, image: "/assets/home_jersey.jpg" },
  { id: 2, name: "Away Jersey", price: 35, image: "/assets/away_jersey.jpg" },
  { id: 3, name: "Training Kit", price: 25, image: "/assets/training_kit.jpg" }
];

const Store = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom textAlign="center">Club Store</Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>{product.name}</Typography>
                <Typography variant="body1" color="text.secondary">${product.price}</Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth 
                  sx={{ mt: 2 }}
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {/* Cart Summary */}
      <Box mt={4} p={2} sx={{ bgcolor: "#f5f5f5", borderRadius: 2, textAlign: "center" }}>
        <Typography variant="h5">Cart Summary</Typography>
        <Typography variant="body1">Total Items: {cart.length}</Typography>
        <Typography variant="body1">Total Price: ${totalPrice}</Typography>
      </Box>
    </Container>
  );
};

export default Store;