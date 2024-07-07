import { useState, useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import { Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      toast.success(message);
      navigate("/dashboard");
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

    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
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
        background: "url('https://thumbs.dreamstime.com/z/lorry-truck-trailer-moving-highway-industrial-long-semi-big-rig-driving-straight-road-over-dramatic-cinematic-natural-310540921.jpg?ct=jpeg') no-repeat center center",
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
            <FaUserAlt size={32} />
            <Typography variant="h4" component="h1" ml={2}>
              Login
            </Typography>
          </Box>
          <form onSubmit={handleSubmit}>
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
              Login
            </Button>
            <Typography variant="body2" align="center" mt={2}>
              Don't have an account? <Link to="/register">Register</Link>
            </Typography>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
