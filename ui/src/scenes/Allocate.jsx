import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { allocateMove } from "../features/allocate/allocateSlice";
import { getTrucks } from "../features/assets/tucks/truckSlice";
import { getTrailers } from "../features/assets/trailers/trailerSlice";
import { getDrivers } from "../features/assets/drivers/driverSlice";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import FlexBetween from "../components/FlexBetween";
import Spinner from "../components/Spinner";
import Header from "../components/Header";

export default function Allocate({ moves }) {
  const { id } = useParams();
  const moveId = id;
  const { trucks } = useSelector((state) => state.trucks);
  const { drivers } = useSelector((state) => state.drivers);
  const { trailers } = useSelector((state) => state.trailers);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTrucks());
    dispatch(getTrailers());
    dispatch(getDrivers());
  }, [dispatch]);

  // State to hold form data with initial values
  const [moveData, setMoveData] = useState({
    truck: "",
    trailer: "",
    driver: "",
    trans_rate_type: "",
    trans_rate: "",
    container_number: "",
    container_weight: "",
    container_size: "",
  });

  // Function to handle form field changes
  const handleInputChange = (name, value) => {
    setMoveData({
      ...moveData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(allocateMove({ moveId, moveData }));
    navigate("/transport"); // Use navigate to redirect
  };


  // Update moveData state with initial values when moves prop changes
  useEffect(() => {
    if (moves && moves.length > 0) {
      const initialMoveData = {
        truck: moves[0].truck || "",
        trailer: moves[0].trailer || "",
        driver: moves[0].driver || "",
        trans_rate_type: moves[0].trans_rate_type || "",
        trans_rate: moves[0].trans_rate || "",
        container_number: moves[0].container_number || "",
        container_weight: moves[0].container_weight || "",
        container_size: moves[0].container_size || "",
      };
      setMoveData(initialMoveData);
    }
  }, [moves]);

  // Render form only when all data is available
  if (!trucks || !drivers || !trailers) {
    return <Spinner />;
  }

  return (
    <>
    <Box m="1.5rem 2.5rem">
      <Header title="Moves" subtitle="Moves List" />
      </Box>
      <form onSubmit={handleUpdate}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="truck-label">Truck</InputLabel>
              <Select
                labelId="truck-label"
                id="truck"
                value={moveData.truck}
                onChange={(e) => handleInputChange("truck", e.target.value)}
              >
                <MenuItem value="">Select Truck</MenuItem>
                {trucks &&
                  trucks.map((truck) => (
                    <MenuItem key={truck._id} value={truck._id}>
                      {truck.reg}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="trailer-label">Trailer</InputLabel>
              <Select
                labelId="trailer-label"
                id="trailer"
                value={moveData.trailer}
                onChange={(e) =>
                  handleInputChange("trailer", e.target.value)
                }
              >
                <MenuItem value="">Select Trailer</MenuItem>
                {trailers &&
                  trailers.map((trailer) => (
                    <MenuItem key={trailer._id} value={trailer._id}>
                      {trailer.reg}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="driver-label">Driver</InputLabel>
              <Select
                labelId="driver-label"
                id="driver"
                value={moveData.driver}
                onChange={(e) =>
                  handleInputChange("driver", e.target.value)
                }
              >
                <MenuItem value="">Select Driver</MenuItem>
                {drivers &&
                  drivers.map((driver) => (
                    <MenuItem key={driver._id} value={driver._id}>
                      {driver.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="trans_rate_type-label">
                Trans Rate Type
              </InputLabel>
              <Select
                labelId="trans_rate_type-label"
                id="trans_rate_type"
                value={moveData.trans_rate_type}
                onChange={(e) =>
                  handleInputChange("trans_rate_type", e.target.value)
                }
              >
                <MenuItem value="">Select Rate Type</MenuItem>
                <MenuItem value="Per Ton">Per Ton</MenuItem>
                <MenuItem value="Per Container">Per Container</MenuItem>
                <MenuItem value="Per TruckLoad">Per TruckLoad</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="container-size-label">Container Size</InputLabel>
              <Select
                labelId="container-size-label"
                id="container_size"
                value={moveData.container_size}
                onChange={(e) =>
                  handleInputChange("container_size", e.target.value)
                }
              >
                <MenuItem value="">Select Container Size</MenuItem>
                <MenuItem value="20FT Container">20FT Container</MenuItem>
                <MenuItem value="20FT Empty Container">
                  20FT Empty Container
                </MenuItem>
                <MenuItem value="40FT Container">40FT Container</MenuItem>
                <MenuItem value="40FT Empty Container">
                  40FT Empty Container
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Container Number"
              value={moveData.container_number}
              onChange={(e) =>
                handleInputChange("container_number", e.target.value)
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Trans Rate"
              value={moveData.trans_rate}
              onChange={(e) => handleInputChange("trans_rate", e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Container Weight"
              value={moveData.container_weight}
              onChange={(e) =>
                handleInputChange("container_weight", e.target.value)
              }
            />
          </Grid>
          <Grid item xs={12}>
            <FlexBetween>
              <Button type="submit" variant="contained" color="primary">
                Allocate
              </Button>
              <Link
                to="/orders"
                style={{ textDecoration: "none", marginLeft: "10px" }}
              >
                <Button variant="contained" color="secondary">
                  Cancel
                </Button>
              </Link>
            </FlexBetween>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
