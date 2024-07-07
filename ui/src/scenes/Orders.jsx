import React, { useEffect, useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, TextField, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getOrders, reset } from "../features/orders/orderSlice";
import { getCustomers } from "../features/customers/customerSlice";
import { createMove, deleteMove } from "../features/transport/moveSlice";
import Spinner from "../components/Spinner";
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Orders = () => {
  const theme = useTheme();
  const [customer, setCustomer] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [cargo_rate, setCargo_rate] = useState("");
  const [cargo_rate_type, setCargo_rate_type] = useState("");
  const [number_trucks, setNumber_trucks] = useState(""); // Initialize numberOfTrucks with an empty string

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orders, isLoading, isError, message } = useSelector((state) => state.orders);
  const { customers } = useSelector((state) => state.customers);
  const [showModal, setShowModal] = useState(false); // Modal state

  const columns = [
    {
      field: "moveId",
      headerName: "Order ID",
      flex: 1,
    },
    {
      field: "customer",
      headerName: "Customer",
      flex: 1,
    },
    {
      field: "origin",
      headerName: "Origin",
      flex: 1,
    },
    {
      field: "destination",
      headerName: "Destination",
      flex: 1,
    },
    {
      field: "cargo_rate",
      headerName: "Rate",
      flex: 1,
    },
    {
      field: "cargo_rate_type",
      headerName: "Rate Type",
      flex: 1,
    },
    {
      field: "Status",
      headerName: "Status",
      flex: 1,
    },
    {
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        const handleDelete = (moveId) => {
          dispatch(deleteMove(moveId)).then(() => {
            dispatch(getOrders());
          });
        };

        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link to={`/allocate/${params.id}`} style={{ textDecoration: 'none', marginRight: '10px' }}>
              <VisibilityIcon style={{ fontSize: '24px', color: '#4CAF50', cursor: 'pointer' }} />
            </Link>
            <DeleteIcon style={{ fontSize: '24px', color: '#FF5722', cursor: 'pointer' }} onClick={() => handleDelete(params.id)} />
          </div>
        );
      },
    }
  ];

  const onSubmit = async () => {
    // Form validation
    if (!customer || !origin || !destination || !cargo_rate || !cargo_rate_type || !number_trucks) {
      alert("Please fill out all fields");
      return;
    }

    await dispatch(createMove({
      customer,
      origin,
      destination,
      cargo_rate,
      cargo_rate_type,
      number_trucks,
      user: user._id,
    }));

    // Reset form fields
    setCustomer("");
    setOrigin("");
    setDestination("");
    setCargo_rate("");
    setCargo_rate_type("");
    setNumber_trucks("");

    dispatch(getOrders());

    setShowModal(false);
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/");
    }
    dispatch(getCustomers());
    dispatch(getOrders());
    return () => {
      dispatch(reset());
    };
  }, [user, isError, message, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Box m="1.5rem 2.5rem">
        <Header title="Moves" subtitle="Moves List" />
        <Box
          height="80vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.primary.light,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowModal(true)}
            style={{ marginBottom: '1rem' }}
          >
            New Order
          </Button>
          <br />
          <DataGrid
            loading={isLoading || !orders}
            getRowId={(row) => row._id}
            rows={orders || []}
            columns={columns}
          />
        </Box>
      </Box>

      {/* Modal Dialog */}
      <Dialog open={showModal} onClose={() => setShowModal(false)} fullWidth maxWidth="sm">
        <DialogTitle>New Order</DialogTitle>
        <DialogContent>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="customer-label">Customer</InputLabel>
                  <Select
                    labelId="customer-label"
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                    fullWidth
                  >
                    <MenuItem value="">Select Customer</MenuItem>
                    {customers &&
                      customers.map((customer) => (
                        <MenuItem key={customer._id} value={customer._id}>
                          {customer.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Origin"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Cargo Rate"
                  value={cargo_rate}
                  onChange={(e) => setCargo_rate(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Cargo Rate Type"
                  value={cargo_rate_type}
                  onChange={(e) => setCargo_rate_type(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="number"
                  label="Number of Trucks"
                  value={number_trucks}
                  onChange={(e) => setNumber_trucks(e.target.value)}
                  fullWidth
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowModal(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={onSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {showModal && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default Orders;
