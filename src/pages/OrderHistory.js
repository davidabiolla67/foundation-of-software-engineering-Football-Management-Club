import React, { useState, useEffect } from "react";
import { Container, Typography, Box, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Order History</Typography>
      {orders.length === 0 ? (
        <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
          <Typography variant="h5" color="error">No past orders found.</Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => navigate("/store")}>Go to Store</Button>
        </Paper>
      ) : (
        orders.map((order) => (
          <Paper key={order.id} elevation={3} sx={{ p: 3, mb: 2 }}>
            <Typography variant="h6">Order ID: {order.id}</Typography>
            <Typography variant="body2" color="text.secondary">Date: {order.date}</Typography>
            <Box sx={{ mt: 2 }}>
              {order.items.map((item, index) => (
                <Typography key={index}>{item.name} (x{item.quantity}) - ${item.price * item.quantity}</Typography>
              ))}
            </Box>
            <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>Total Price: ${order.totalPrice}</Typography>
          </Paper>
        ))
      )}
    </Container>
  );
};

export default OrderHistory;