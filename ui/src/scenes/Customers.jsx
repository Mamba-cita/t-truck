import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box, useTheme } from "@mui/material";
import Header from "../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import Spinner from "../components/Spinner";
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  createCustomer,
  getCustomers,
  deleteCustomer,
  reset,
} from "../features/customers/customerSlice";

const Customers = () => {
  const theme = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createCustomer({
        name,
        email,
        city,
        state,
        country,
        phoneNumber,
      })
    );
    setShowModal(false); 
    setName("");
    setEmail("");
    setCity("");
    setState("");
    setCountry("");
    setPhoneNumber("");

    dispatch(getCustomers());
    };

  const { user } = useSelector((state) => state.auth);
  const { customers, isLoading, isError, message } = useSelector(
    (state) => state.customers
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/");
    }
    dispatch(getCustomers());
    return () => {
      dispatch(reset());
    };
  }, [user, isError, message, navigate, dispatch]);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.5,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    {
      field: "country",
      headerName: "Country",
      flex: 0.4,
    },
    {
      field: "city",
      headerName: "City",
      flex: 0.5,
    },
    {
      field: "state",
      headerName: "State",
      flex: 1,
    },
    {
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        const handleDelete = (customersId) => {
          dispatch(deleteCustomer(customersId)).then(() => {
            dispatch(getCustomers());
          });
        };
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link to={`/moves/${params.id}`} style={{ textDecoration: 'none', marginRight: '10px' }}>
              <VisibilityIcon style={{ fontSize: '24px', color: '#4CAF50', cursor: 'pointer' }} />
            </Link>
            <DeleteIcon style={{ fontSize: '24px', color: '#FF5722', cursor: 'pointer' }} onClick={() => handleDelete(params.id)} />

          </div>
        );
      },
    },
    
  ];
  
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Box m="1.5rem 2.5rem">
        <Header title="CUSTOMERS" subtitle="List of Customers" />
        <p>You are on the customers page {user && user.name}</p>

        <Box
          mt="40px"
          height="75vh"
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
          <button
          type="button"
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
          style={{ marginBottom: '1rem' }}
        >
          New Customer
        </button>
          <br />

          <DataGrid
  loading={isLoading || !customers}
  getRowId={(row) => row._id || Math.random().toString(36).substring(7)} // Use a random id if _id is missing
  rows={customers.filter(row => row._id)} // Filter out rows without _id property
  columns={columns}
/>

        </Box>
      </Box>
     
      {showModal && (
        <div className="modal fade show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5">New Customer</h1>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setShowModal(false)} // Close modal on button click
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={onSubmit}> {/* Use onSubmit on form */}
                  <div className="row">
                    <div className="col">
                  <input
                      type="text"
                      id="name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      class="form-control"
                      placeholder="Name"
                      aria-label="Name"
                    />
                  </div>
                  <div class="col">
                  <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      class="form-control"
                      placeholder="Email"
                      aria-label="Email"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                  <input
                      type="text"
                      id="city"
                      name="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      class="form-control"
                      placeholder="City"
                      aria-label="City"
                    />
                  </div>
                  <div class="col">
                  <input
                      type="text"
                      id="state"
                      name="state"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      class="form-control"
                      placeholder="State"
                      aria-label="State"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                  <input
                      type="text"
                      id="country"
                      name="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      class="form-control"
                      placeholder="Country"
                      aria-label="Country"
                    />
                  </div>
                  <div class="col">
                  <input
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      class="form-control"
                      placeholder="Tel"
                      aria-label="Tel"
                    />
                  </div>
                </div>
                <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                      onClick={() => setShowModal(false)} // Close modal on button click
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Customers;
