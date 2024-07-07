import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import { Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    state: "",
    country: "",
    password: "",
    password1: "",
  });

  const { name, email, city, state, country, password, password1 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      toast.success(message);
      navigate("/login");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, dispatch, navigate]);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== password1) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
        city,
        state,
        country,
      };
      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "url('https://thumbs.dreamstime.com/z/truck-driving-highway-29978233.jpg?ct=jpeg') no-repeat center center",
        backgroundSize: "cover",
        padding: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 500,
          width: "100%",
          boxShadow: 5,
          borderRadius: 3,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        }}
      >
        <CardContent sx={{ padding: 4 }}>
          <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
            <FaUser size={32} />
            <Typography variant="h4" component="h1" ml={2}>
              Register
            </Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              variant="outlined"
            />
            <TextField
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              variant="outlined"
            />
            <TextField
              label="City"
              type="text"
              name="city"
              value={city}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              variant="outlined"
            />
            <TextField
              label="State"
              type="text"
              name="state"
              value={state}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              variant="outlined"
            />
            <TextField
              label="Country"
              type="text"
              name="country"
              value={country}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              variant="outlined"
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              variant="outlined"
            />
            <TextField
              label="Confirm Password"
              type="password"
              name="password1"
              value={password1}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              variant="outlined"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                marginTop: 2,
                padding: 1.5,
                fontSize: 16,
                fontWeight: 'bold',
                backgroundColor: "#1976d2",
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
              }}
            >
              Register
            </Button>
            
          </form>
          <Typography variant="body2" color="textSecondary" align="center" sx={{ marginTop: 2 }}>
              Already have an account? <Link to="/login">Login</Link>
            </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
