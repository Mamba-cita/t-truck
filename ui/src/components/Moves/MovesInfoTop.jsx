import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import MovesInfoBottom from "./MovesInfoBottom";
import { getMoves, reset } from "../../features/transport/moveSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner";

export default function MovesInfoTop() {
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
  return (
    <div>
      {moves.map((move) => (
        <>
          <Typography variant="h6" gutterBottom>
            <h5> Status {move.Status}</h5>
          </Typography>
          <Card
            key={move.id}
            variant="outlined"
            style={{ marginBottom: "20px" }}
          >
            <CardContent>
              <TableContainer>
                <Table style={{ border: "none" }}>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Typography variant="subtitle1">Customer:</Typography>{" "}
                        {move.customer?.name}
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1">Receiver:</Typography>{" "}
                        {move.customer?.name}
                      </TableCell>

                      <TableCell>
                        <Typography variant="subtitle1">
                          Origin Country:
                        </Typography>{" "}
                        {move.originCountry}
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1">
                          Destination Country:
                        </Typography>{" "}
                        {move.destinationCountry}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="subtitle1">Origin:</Typography>{" "}
                        {move.origin}
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1">
                          Destination:
                        </Typography>{" "}
                        {move.destination}
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1">Cargo Rate:</Typography>{" "}
                        {move.cargo_rate}
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1">Rate Type:</Typography>{" "}
                        {move.cargo_rate_type}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="subtitle1">Truck:</Typography>{" "}
                        {move.truck}
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1">Trailer:</Typography>{" "}
                        {move.trailer}
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1">Driver:</Typography>{" "}
                        {move.driver.name}
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1">Driver Tel:</Typography>{" "}
                        {move.driver.tel}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
            <MovesInfoBottom />
          </Card>
        </>
      ))}
    </div>
  );
}
