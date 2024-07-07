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
} from "@mui/material";

export default function Events({ moves }) {
  const { id } = useParams();
  const moveId = id;

  const dispatch = useDispatch();

  // State to hold form data with initial values
  const [moveData, setMoveData] = useState({
    client_pain: '', 
    invoiced: '', 
    arr_origin: '', 
    gatein_origin: '', 
    gateout_origin: '', 
    arr_border: '', 
    dep_border: '', 
    arr_dest: '', 
    gatein_des: '', 
    dep_des: '', 
    arr_empty_des: '', 
    dep_empty_des: '', 
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
        client_pain: moves[0].client_pain || '',
        invoiced: moves[0].invoiced || '',
        arr_origin: moves[0].arr_origin || '',
        gatein_origin: moves[0].gatein_origin || '',
        gateout_origin: moves[0].gateout_origin || '',
        arr_border: moves[0].arr_border || '',
        dep_border: moves[0].dep_border || '',
        arr_dest: moves[0].arr_dest || '',
        gatein_des: moves[0].gatein_des || '',
        dep_des: moves[0].dep_des || '',
        arr_empty_des: moves[0].arr_empty_des || '',
        dep_empty_des: moves[0].dep_empty_des || '',
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
                   Arrival At Loading{" "}
                  </Typography>
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    type="datetime-local"
                    value={moveData.arr_origin}
                    onChange={(e) =>
                      handleInputChange("arr_origin", e.target.value)
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
                   Gate In Loading{" "}
                  </Typography>
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    type="datetime-local"
                    value={moveData.gatein_origin}
                    onChange={(e) =>
                      handleInputChange("gatein_origin", e.target.value)
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
                   Gate Out Loading{" "}
                  </Typography>
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    type="datetime-local"
                    value={moveData.gateout_origin}
                    onChange={(e) =>
                      handleInputChange("gateout_origin", e.target.value)
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
                   Arrival At Boarder{" "}
                  </Typography>
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    type="datetime-local"
                    value={moveData.arr_border}
                    onChange={(e) =>
                      handleInputChange("arr_border", e.target.value)
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
                   Departure Boarder{" "}
                  </Typography>
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    type="datetime-local"
                    value={moveData.dep_border}
                    onChange={(e) =>
                      handleInputChange("dep_border", e.target.value)
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
                   Arrival At Offloading{" "}
                  </Typography>
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    type="datetime-local"
                    value={moveData.arr_dest}
                    onChange={(e) =>
                      handleInputChange("arr_dest", e.target.value)
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
                   Gate In Offloading{" "}
                  </Typography>
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    type="datetime-local"
                    value={moveData.gatein_des}
                    onChange={(e) =>
                      handleInputChange("gatein_des", e.target.value)
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
                   Gate Out Offloading{" "}
                  </Typography>
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    type="datetime-local"
                    value={moveData.dep_des}
                    onChange={(e) =>
                      handleInputChange("dep_des", e.target.value)
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
                  Arrival At Empty Depot{" "}
                  </Typography>
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    type="datetime-local"
                    value={moveData.arr_empty_des}
                    onChange={(e) =>
                      handleInputChange("arr_empty_des", e.target.value)
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
                  Departure Empty Depot{" "}
                  </Typography>
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    type="datetime-local"
                    value={moveData.dep_empty_des}
                    onChange={(e) =>
                      handleInputChange("dep_empty_des", e.target.value)
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
                    Invoiced{" "}
                  </Typography>
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    type="datetime-local"
                    value={moveData.invoiced}
                    onChange={(e) =>
                      handleInputChange("invoiced", e.target.value)
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
                    Invoice paid{" "}
                  </Typography>
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    type="datetime-local"
                    value={moveData.client_pain}
                    onChange={(e) =>
                      handleInputChange("client_pain", e.target.value)
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
