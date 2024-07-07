import React, { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../Header";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getMoves, deleteMove, reset } from "../../features/transport/moveSlice";
import Spinner from "../Spinner";
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';


const Paid = () => {
  const theme = useTheme();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { moves, isLoading, isError, message } = useSelector(
    (state) => state.moves
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/");
    }
    dispatch(getMoves());
    return () => {
      dispatch(reset());
    };
  }, [user, isError, message, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

   // Filter moves to include only those with the status "completed"
   const filteredMoves = moves.filter(move => move.Status === "Paid");

  const columns = [
    {
      field: "truck",
      headerName: "Truck",
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
      field: "container_number",
      headerName: "Container Number",
      flex: 1,
    },
    {
      field: "dep_des",
      headerName: "Offloaded Date",
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
        field: "invoice_no",
        headerName: "Invoice No",
        flex: 1,
      },
    {
      field: "Status",
      headerName: "Stage",
      flex: 1,
    },
    {
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        const handleDelete = (moveId) => {
          dispatch(deleteMove(moveId)).then(() => {
            dispatch(getMoves());
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
    }
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Paid" subtitle="Paid Invoices" />
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
          loading={isLoading || !moves}
          getRowId={(row) => row._id}
          rows={filteredMoves}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Paid;
