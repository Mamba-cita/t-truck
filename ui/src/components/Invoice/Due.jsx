import React, { useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../Header";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getMoves, deleteMove, reset } from "../../features/transport/moveSlice";
import Spinner from "../Spinner";
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Due = () => {
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
// Filter moves to include only those with the status "Invoiced"
const filteredMoves = moves.filter(move => move.Status === "Invoiced")
  // Filter further to include only moves where invoice date is higher than payment terms
  .filter(move => {
    const currentDate = new Date();
    const invoiceDateTime = new Date(move.invoiced);
    const differenceInTime = currentDate.getTime() - invoiceDateTime.getTime();
    const days_since_invoice = Math.floor(differenceInTime / (1000 * 3600 * 24));
    return days_since_invoice > move.payment_terms;
  });


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
        field: "invoiced",
        headerName: "Invoiced Date",
        flex: 1,
      },
      {
        field: "Days Past Due",
        headerName: "Days Past Due",
        flex: 1,
        valueGetter: (params) => {
          const invoiceDateTime = new Date(params.row.invoiced);
          const currentDate = new Date();
          const differenceInTime = currentDate.getTime() - invoiceDateTime.getTime();
          const daysPastDue = Math.floor(differenceInTime / (1000 * 3600 * 24));
          return daysPastDue;
        },
        cellClassName: (params) => {
          const daysPastDue = params.value;
          let color;
          if (daysPastDue >= 0 && daysPastDue <= 5) {
            color = 'green';
          } else if (daysPastDue >= 6 && daysPastDue <= 12) {
            color = 'yellow';
          } else {
            color = 'red';
          }
          return `MuiDataGrid-cell--${color}`;
        },
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
      <Header title="Due Invoices" subtitle="Ready For Collections" />
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

export default Due;
