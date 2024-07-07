import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getMoves, reset } from '../features/transport/moveSlice';
import Spinner from '../components/Spinner';
import Header from '../components/Header';
import { Box, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableRow, Paper, TextField, Button, FormControl, FormLabel, Select, MenuItem } from '@mui/material';
import { createFuelOrder, getAllFuelRecords } from '../features/fuel/fuelSlice';

const FuelOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { moves, isLoading, isError, message } = useSelector((state) => state.moves);
  const { id } = useParams();
  const [fuelData, setFormData] = React.useState({
    requested_date: '',
    amount_requested: '',
    fuel_type: '',
    fuel_lpo: '',
    city: '',
    station: '',
    moveId: '',
    truck: '',
    driver: '',
  });

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/");
    }

    dispatch(getMoves());
    dispatch(getAllFuelRecords());


    return () => {
      dispatch(reset());
    };
  }, [user, isError, message, navigate, dispatch]);

  // Find the move object with the corresponding moveId
  const move = moves.find((move) => move._id === id);

  // Update fuelData with move.moveId when move is available
  useEffect(() => {
    if (move) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        moveId: move.moveId,
        truck: move.truck,
        driver: move.driver,
      }));
    }
  }, [move]);

  const handleInputChange = (name, value) => {
    setFormData({ ...fuelData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("fuelrequest", fuelData);
    dispatch(createFuelOrder({fuelData}));
    // Reset form data after submission

    navigate("/fuel");
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Box m="1.5rem 2.5rem">
      {move && (
        <Card>
          <CardContent>
            <Header title={`Fueling Truck: ${move.truck}`} subtitle="" />
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Move ID:</TableCell>
                    <TableCell colSpan={2}>{move.moveId}</TableCell>
                    <TableCell>Truck:</TableCell>
                    <TableCell>{move.truck}</TableCell>
                    <TableCell>Driver:</TableCell>
                    <TableCell>{move.driver}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Origin:</TableCell>
                    <TableCell>{move.origin}</TableCell>
                    <TableCell>Destination:</TableCell>
                    <TableCell>{move.destination}</TableCell>
                    <TableCell>Stage:</TableCell>
                    <TableCell>{move.Status}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Box mt={4}>
              <form onSubmit={handleSubmit}>
                <FormControl fullWidth sx={{ display: 'flex', flexDirection: 'column' }}>
                  <FormLabel htmlFor="requested_date">Request Time</FormLabel>
                  <TextField
                    id="requested_date"
                    type="datetime-local"
                    name="requested_date"
                    value={fuelData.requested_date}
                    onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                  />
                </FormControl>
                <FormControl fullWidth sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                  <FormLabel htmlFor="amount_requested">Requested Amount</FormLabel>
                  <TextField
                    id="amount_requested"
                    type="text"
                    name="amount_requested"
                    value={fuelData.amount_requested}
                    onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                  />
                </FormControl>
                <FormControl fullWidth sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                  <FormLabel htmlFor="fuel_type">Fuel Type</FormLabel>
                  <Select
                    labelId="fuel-type-label"
                    id="fuel_type"
                    value={fuelData.fuel_type}
                    onChange={(e) => handleInputChange("fuel_type", e.target.value)}
                  >
                    <MenuItem value="">Select Fuel Type</MenuItem>
                    <MenuItem value="Diesel">Diesel</MenuItem>
                    <MenuItem value="Petrol">Petrol</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                  <FormLabel htmlFor="fuel_lpo">Fuel LPO</FormLabel>
                  <TextField
                    id="fuel_lpo"
                    type="text"
                    name="fuel_lpo"
                    value={fuelData.fuel_lpo}
                    onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                  />
                </FormControl>
                <FormControl fullWidth sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                  <FormLabel htmlFor="city">City</FormLabel>
                  <TextField
                    id="city"
                    type="text"
                    name="city"
                    value={fuelData.city}
                    onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                  />
                </FormControl>
                <FormControl fullWidth sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                  <FormLabel htmlFor="station">Station</FormLabel>
                  <TextField
                    id="station"
                    type="text"
                    name="station"
                    value={fuelData.station}
                    onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                  />
                </FormControl>
                <Box mt={2}>
                  <Button type="submit" variant="contained" color="primary">
                    Submit
                  </Button>
                </Box>
              </form>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default FuelOrder;
