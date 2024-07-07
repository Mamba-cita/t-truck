import React, { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../Spinner";
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteFuelById, getAllFuelRecords, reset } from "../../features/fuel/fuelSlice";
import VisibilityIcon from '@mui/icons-material/Visibility';


const Fueled = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { fuel, isLoading, isError, message } = useSelector(
    (state) => state.fuel
  );
  const [dataLoaded, setDataLoaded] = useState(false);
  dispatch(getAllFuelRecords()).then(() => {
    setDataLoaded(true);
  });

  // Filter fuel records with status "Fueled" only if fuel array is defined
  const fueled = fuel ? fuel.filter((record) => record.Status === "Fueled") : [];

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/");
    }
   
    return () => {
      dispatch(reset());
    };
  }, [user, isError, message, navigate, dispatch]);

  if (isLoading || !dataLoaded) {
    return <Spinner />;
  }

  const columns = [
    {
      field: "fuelId",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "truck",
      headerName: "Truck",
      flex: 1,
    },
    {
      field: "station",
      headerName: "Station",
      flex: 1,
    },
    {
      field: "city",
      headerName: "Town",
      flex: 1,
    },
    {
      field: "amount_requested",
      headerName: "Requested Amount",
      flex: 1,
    },
    {
      field: "amount_fueled",
      headerName: "Fueled Amount",
      flex: 1,
    },
    {
      field: "arr_at_station",
      headerName: "Arrival At Station",
      flex: 1,
    },
    {
      field: "dep_at_station",
      headerName: "Departed At Station",
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
        const handleDelete = (fuelId) => {
          dispatch(deleteFuelById(fuelId)).then(() => {
            dispatch(getAllFuelRecords());
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
          loading={isLoading}
          getRowId={(row) => row._id}
          rows={fueled || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Fueled;
