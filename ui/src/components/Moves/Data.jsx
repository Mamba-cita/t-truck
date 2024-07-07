import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateMove } from '../../features/transport/moveSlice';
import {
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  MenuItem, // Import MenuItem for select dropdown
} from "@mui/material";

export default function Data({ moves }) {
  const { id } = useParams();
  const moveId = id;

  const dispatch = useDispatch();

  // State to hold form data with initial values
  const [moveData, setMoveData] = useState({
    trans_rate: '',
    trans_rate_type: '', 
    container_weight: '',
    container_size: '', 
    empty_return_des: '',
    g_form: '',
    invoice_no: '', // Corrected typo from inoice_no to invoice_no
  });

  // Function to handle form field changes
  const handleInputChange = (fieldName, value) => {
    setMoveData({
      ...moveData,
      [fieldName]: value,
    });
  };

  // Function to handle form submission
  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateMove({ moveId, moveData }));
  };

  // Update moveData state with initial values when moves prop changes
  useEffect(() => {
    if (moves.length > 0) {
      const initialMoveData = {
        trans_rate: moves[0].trans_rate || '', 
        trans_rate_type: moves[0].trans_rate_type || '', 
        container_weight: moves[0].container_weight || '',
        container_size: moves[0].container_size || '', 
        empty_return_des: moves[0].empty_return_des || '',
        g_form: moves[0].g_form || '',
        invoice_no: moves[0].invoice_no || '', // Corrected typo from inoice_no to invoice_no
      };
      setMoveData(initialMoveData);
    }
  }, [moves]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "20px",
          margin: "20px",
        }}
      >
        <Button variant="contained" color="primary" type="submit" sx={{}} onClick={handleUpdate}>
          Save
        </Button>
      </div>
      <form onSubmit={handleUpdate}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h6" color="primary">
                    Label
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" color="secondary">
                    Values
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography
                    variant="body1"
                    color="primary"
                    fontWeight="bold"
                    fontSize="15px"
                  >
                   Transport Rate{" "}
                  </Typography>
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    type="text"
                    fullWidth
                    value={moveData.trans_rate}
                    onChange={(e) =>
                      handleInputChange("trans_rate", e.target.value)
                    }
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography
                    variant="body1"
                    color="primary"
                    fontWeight="bold"
                    fontSize="15px"
                  >
                   Transport Rate Type{" "}
                  </Typography>
                </TableCell>
                <TableCell>
                  <TextField
                    select
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={moveData.trans_rate_type}
                    onChange={(e) =>
                      handleInputChange("trans_rate_type", e.target.value)
                    }
                  >
                    <MenuItem value="">Select Rate Type</MenuItem>
                    <MenuItem value="Per Ton">Per Ton</MenuItem>
                    <MenuItem value="Per Container">Per Container</MenuItem>
                    <MenuItem value="Truck Load">Truck Load</MenuItem>
                  </TextField>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography
                    variant="body1"
                    color="primary"
                    fontWeight="bold"
                    fontSize="15px"
                  >
                   Container Weight{" "}
                  </Typography>
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    type="text"
                    fullWidth
                    value={moveData.container_weight}
                    onChange={(e) =>
                      handleInputChange("container_weight", e.target.value)
                    }
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography
                    variant="body1"
                    color="primary"
                    fontWeight="bold"
                    fontSize="15px"
                  >
                   Container Size{" "}
                  </Typography>
                </TableCell>
                <TableCell>
                  <TextField
                    select
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={moveData.container_size}
                    onChange={(e) =>
                      handleInputChange("container_size", e.target.value)
                    }
                  >
                    <MenuItem value="">Select Container Size</MenuItem>
                    <MenuItem value="20FT Container">20FT Container</MenuItem>
                    <MenuItem value="20FT Empty Container">20FT Empty Container</MenuItem>
                    <MenuItem value="40FT Container">40FT Container</MenuItem>
                    <MenuItem value="40FT Empty Container">40FT Empty Container</MenuItem>
                  </TextField>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography
                    variant="body1"
                    color="primary"
                    fontWeight="bold"
                    fontSize="15px"
                  >
                   Empty Return Destination{" "}
                  </Typography>
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    type="text"
                    fullWidth
                    value={moveData.empty_return_des}
                    onChange={(e) =>
                      handleInputChange("empty_return_des", e.target.value)
                    }
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography
                    variant="body1"
                    color="primary"
                    fontWeight="bold"
                    fontSize="15px"
                  >
                   G-Form{" "}
                  </Typography>
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    type="text"
                    fullWidth
                    value={moveData.g_form}
                    onChange={(e) =>
                      handleInputChange("g_form", e.target.value)
                    }
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography
                    variant="body1"
                    color="primary"
                    fontWeight="bold"
                    fontSize="15px"
                  >
                   Invoice No{" "}
                  </Typography>
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    type="text"
                    fullWidth
                    value={moveData.invoice_no}
                    onChange={(e) =>
                      handleInputChange("invoice_no", e.target.value)
                    }
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </form>
    </>
  );
}
