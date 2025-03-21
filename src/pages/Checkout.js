import React, { useState, useEffect } from "react";
import { Container, Typography, Box, TextField, Button, Paper } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  useEffect(() => {
    if (location.state?.cart) {
      setCart(location.state.cart);
    }
  }, [location.state]);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    payment: ""
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    // Create order object
    const newOrder = {
      id: Date.now(), // Unique order ID
      date: new Date().toLocaleString(),
      items: cart,
      totalPrice,
    };

    // Retrieve existing orders from local storage
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

    // Save updated order history
    localStorage.setItem("orders", JSON.stringify([...existingOrders, newOrder]));

    setOrderPlaced(true);
    setTimeout(() => navigate("/order-history"), 3000); // Redirect to Order History
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Checkout</Typography>
      {orderPlaced ? (
        <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
          <Typography variant="h5" color="success.main">Order Placed Successfully! 🎉</Typography>
          <Typography variant="body1">Redirecting to Order History...</Typography>
        </Paper>
      ) : cart.length === 0 ? (
        <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
          <Typography variant="h5" color="error">Your cart is empty.</Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => navigate("/store")}>Go Back to Store</Button>
        </Paper>
      ) : (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Typography variant="h6">Order Summary</Typography>
          <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
            {cart.map((item) => (
              <Typography key={item.id}>
                {item.name} (x{item.quantity}) - ${item.price * item.quantity}
              </Typography>
            ))}
            <Typography variant="h6" sx={{ mt: 2 }}>Total Price: ${totalPrice}</Typography>
          </Paper>

          <Typography variant="h6">Shipping Details</Typography>
          <TextField fullWidth label="Full Name" name="name" required onChange={handleChange} sx={{ my: 1 }} />
          <TextField fullWidth label="Address" name="address" required onChange={handleChange} sx={{ my: 1 }} />
          <TextField fullWidth label="Payment Method" name="payment" required onChange={handleChange} sx={{ my: 1 }} />

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Confirm Order
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Checkout;