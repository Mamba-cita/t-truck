import React, { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FlexBetween from "../FlexBetween";
import { getDrivers, reset } from "../../features/assets/drivers/driverSlice";

const Driver = () => {
  const theme = useTheme();


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const {drivers , isLoading, isError, message } = useSelector(
    (state) => state.drivers
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/");
    }
    dispatch(getDrivers());
    return () => {
      dispatch(reset());
    };
  }, [user, isError, message, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  const handleEdit = () => {
    console.log("handleEdit");
  };

  const handleDelete = () => {
    console.log("handleDelete");
  };
  const columns = [
  
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "dl",
      headerName: "DL",
      flex: 1,
    },
    {
      field: "id_no",
      headerName: "ID No.",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "tel",
      headerName: "Tel",
      flex: 1,
    },
    {
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        return (
          <div>
            <FlexBetween>
            <button
              onClick={() => handleEdit(params.row._id)}
              className="btn btn-warning btn-sm"
              style={{ marginRight: 5, display: "flex", alignItems: "center",  background: "none" }}
            >
              <EditIcon fontSize="small" style={{ marginRight: 5 }} /> Edit
            </button>
            <button
              onClick={() => handleDelete(params.row._id)}
              className="btn btn-danger btn-sm"
              style={{ display: "flex", alignItems: "center",  background: "none" }}
            >
              <DeleteIcon fontSize="small" style={{ marginRight: 5 }} /> Delete
            </button>
            </FlexBetween>
          </div>
        );
      },
    },
  ];

  return (
  
    <Box m="1.5rem 2.5rem">
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
        <DataGrid
             loading={isLoading || !drivers}
             getRowId={(row) => row._id}
             rows={drivers || []}
             columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Driver;

