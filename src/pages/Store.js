import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Grid,
  Container,
  Box,
  IconButton,
  Badge,
  MenuItem,
  Select,
  TextField,
  Checkbox,
  FormControlLabel,
  Rating,
  Drawer,
  List,
  ListItem,
  ListItemText
} from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useNavigate } from "react-router-dom";

// Replace these images with your actual images or URLs
import gucciDuffle from "../assets/images/away_jersey.jpg";
import cpuCooler from "../assets/images/away_jersey.jpg";
import bookShelf from "../assets/images/away_jersey.jpg";

/**
 * Example product data to match the screenshot.
 * You can expand this array to include more products or details.
 */
const productsData = [
  {
    id: 1,
    name: "Nike Track",
    price: 8650,
    category: "Fashion",
    stock: 5,
    image: gucciDuffle,
    rating: 4.5
  },
  {
    id: 2,
    name: "RGB Liquid CPU Cooler",
    price: 1450,
    category: "Electronics",
    stock: 3,
    image: cpuCooler,
    rating: 4.8
  },
  {
    id: 3,
    name: "Small BookShelf",
    price: 1000,
    category: "Home & Office",
    stock: 10,
    image: bookShelf,
    rating: 4.2
  },
  {
    id: 4,
    name: "RGB Liquid CPU Cooler",
    price: 1450,
    category: "Electronics",
    stock: 2,
    image: cpuCooler,
    rating: 4.8
  },
  {
    id: 5,
    name: "RGB Liquid CPU Cooler",
    price: 1450,
    category: "Electronics",
    stock: 2,
    image: cpuCooler,
    rating: 4.8
  },
  {
    id: 6,
    name: "RGB Liquid CPU Cooler",
    price: 1450,
    category: "Electronics",
    stock: 2,
    image: cpuCooler,
    rating: 4.8
  },{
    id: 7,
    name: "RGB Liquid CPU Cooler",
    price: 1450,
    category: "Electronics",
    stock: 2,
    image: cpuCooler,
    rating: 4.8
  }
  ,
  {
    id: 8,
    name: "RGB Liquid CPU Cooler",
    price: 1450,
    category: "Electronics",
    stock: 2,
    image: cpuCooler,
    rating: 4.8
  }
];

const Store = () => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [products, setProducts] = useState(productsData);

  // Sidebar (Filter) states
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 });
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [openFilter, setOpenFilter] = useState(false);

  const navigate = useNavigate();

  // Cart functions
  const addToCart = (product) => {
    if (product.stock === 0) return;
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
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
    setCart(
      cart.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  // Wishlist toggle
  const toggleWishlist = (product) => {
    if (wishlist.some((item) => item.id === product.id)) {
      setWishlist(wishlist.filter((item) => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  // Filter Logic
  const handleFilter = () => {
    setOpenFilter(!openFilter);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handlePriceChange = (type, value) => {
    setPriceRange({ ...priceRange, [type]: Number(value) });
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Filtered Products
  const filteredProducts = products.filter((product) => {
    // Category filter
    const categoryMatch =
      selectedCategory === "All" || product.category === selectedCategory;

    // Price filter
    const priceMatch =
      product.price >= priceRange.min && product.price <= priceRange.max;

    // Search filter (by product name)
    const searchMatch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return categoryMatch && priceMatch && searchMatch;
  });

  // Cart summary
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5" fontWeight="bold">
          Unity Club Official Store
        </Typography>
        <Box display="flex" gap={2}>
          {/* Search Bar */}
          <TextField
            label="Search..."
            variant="outlined"
            size="small"
            value={search}
            onChange={handleSearchChange}
          />
          {/* Cart Icon with Badge */}
          <Badge badgeContent={totalItems} color="primary">
            <ShoppingCartIcon fontSize="large" />
          </Badge>
          {/* Filter Toggle Button (for mobile view) */}
          <IconButton onClick={handleFilter}>
            <FilterListIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Main Content with Sidebar + Product Grid */}
      <Grid container spacing={2}>
        {/* Sidebar (Filters) */}
        <Grid
          item
          xs={12}
          sm={4}
          md={3}
          lg={2}
          sx={{
            display: { xs: "none", sm: "block" },
            borderRight: "1px solid #ccc",
            pr: 2
          }}
        >
          <Typography variant="h6" gutterBottom>
            Price
          </Typography>
          <Box display="flex" gap={1} mb={2}>
            <TextField
              label="Min"
              variant="outlined"
              size="small"
              type="number"
              value={priceRange.min}
              onChange={(e) => handlePriceChange("min", e.target.value)}
              sx={{ width: "50%" }}
            />
            <TextField
              label="Max"
              variant="outlined"
              size="small"
              type="number"
              value={priceRange.max}
              onChange={(e) => handlePriceChange("max", e.target.value)}
              sx={{ width: "50%" }}
            />
          </Box>

          <Typography variant="h6" gutterBottom>
            Discount
          </Typography>
          <FormControlLabel
            control={<Checkbox />}
            label="10% Off "
          />
          <FormControlLabel
            control={<Checkbox />}
            label="25% Off "
          />
          <FormControlLabel
            control={<Checkbox />}
            label="50% Off"
          />

          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Category
          </Typography>
          <Select
            fullWidth
            value={selectedCategory}
            onChange={handleCategoryChange}
            size="small"
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Fashion">Fashion</MenuItem>
            <MenuItem value="Electronics">Electronics</MenuItem>
            <MenuItem value="Home & Office">Home & Office</MenuItem>
          </Select>

          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Brand
          </Typography>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Unity Club Official Store"
          />
        </Grid>

        {/* Product Grid */}
        <Grid item xs={12} sm={8} md={9} lg={10}>
          <Grid container spacing={3}>
            {filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Card
                  sx={{
                    boxShadow: 3,
                    borderRadius: 2,
                    transition: "0.3s",
                    "&:hover": { boxShadow: 6 }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image}
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography variant="body1" fontWeight="bold" noWrap>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ₦{product.price}
                    </Typography>
                    <Rating
                      name={`rating-${product.id}`}
                      value={product.rating}
                      precision={0.1}
                      readOnly
                      size="small"
                    />
                    <Typography
                      variant="body2"
                      color={product.stock > 0 ? "green" : "red"}
                      sx={{ mt: 1 }}
                    >
                      {product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ mt: 2, fontWeight: "bold", borderRadius: 1 }}
                      onClick={() => addToCart(product)}
                      disabled={product.stock === 0}
                      id="add_to_cart_btn"
                    >
                      Add to Cart
                    </Button>
                    <IconButton sx={{ mt: 1 }} onClick={() => toggleWishlist(product)}>
                      {wishlist.some((item) => item.id === product.id) ? (
                        <FavoriteIcon color="error" />
                      ) : (
                        <FavoriteBorderIcon />
                      )}
                    </IconButton>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* Cart Summary */}
      <Box mt={4} p={3} sx={{ bgcolor: "#f5f5f5", borderRadius: 2, boxShadow: 2 }}>
        <Typography variant="h5">Cart Summary</Typography>
        {cart.length === 0 ? (
          <Typography variant="body1" sx={{ mt: 1, color: "gray" }}>
            Your cart is empty.
          </Typography>
        ) : (
          cart.map((item) => (
            <Box
              key={item.id}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                my: 1,
                p: 2,
                bgcolor: "white",
                borderRadius: 1,
                boxShadow: 1
              }}
            >
              <Typography variant="body1">
                {item.name} (₦{item.price} x {item.quantity})
              </Typography>
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
        <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
          Total Price: ₦{totalPrice}
        </Typography>
        {cart.length > 0 && (
          <Button
            variant="contained"
            color="success"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => navigate("/checkout", { state: { cart } })}
            id="ptoc_btn"
          >
            Proceed to Checkout
          </Button>
        )}
      </Box>

      {/* Mobile Drawer for Filters */}
      <Drawer anchor="right" open={openFilter} onClose={handleFilter}>
        <Box sx={{ width: 250, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Filters
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Price" />
            </ListItem>
            <Box display="flex" gap={1} mb={2} px={2}>
              <TextField
                label="Min"
                variant="outlined"
                size="small"
                type="number"
                value={priceRange.min}
                onChange={(e) => handlePriceChange("min", e.target.value)}
              />
              <TextField
                label="Max"
                variant="outlined"
                size="small"
                type="number"
                value={priceRange.max}
                onChange={(e) => handlePriceChange("max", e.target.value)}
              />
            </Box>

            <ListItem>
              <ListItemText primary="Discount" />
            </ListItem>
            <FormControlLabel
              control={<Checkbox />}
              label="10% Off or more"
              sx={{ ml: 2 }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="25% Off or more"
              sx={{ ml: 2 }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="50% Off or more"
              sx={{ ml: 2 }}
            />

            <ListItem>
              <ListItemText primary="Category" />
            </ListItem>
            <Box px={2}>
              <Select
                fullWidth
                value={selectedCategory}
                onChange={handleCategoryChange}
                size="small"
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Fashion">Fashion</MenuItem>
                <MenuItem value="Electronics">Electronics</MenuItem>
                <MenuItem value="Home & Office">Home & Office</MenuItem>
              </Select>
            </Box>

            <ListItem sx={{ mt: 2 }}>
              <ListItemText primary="Brand" />
            </ListItem>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Jumia Official Store"
              sx={{ ml: 2 }}
            />
          </List>
        </Box>
      </Drawer>
    </Container>
  );
};

export default Store;
