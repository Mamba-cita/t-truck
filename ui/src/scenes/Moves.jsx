
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { getMoveById, getMoves, reset } from "../features/transport/moveSlice";
import MovesInfoTop from "../components/Moves/MovesInfoTop";




export default function Moves() {
    const { id } = useParams();
    const { user } = useSelector((state) => state.auth);
    const {isLoading, isError, message } = useSelector(
      (state) => state.moves
    );

    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    useEffect(() => {
      if (isError) {
        console.log(message);
      }
    
      if (!user) {
        Navigate("/");
      }
      dispatch(getMoveById(id));
      dispatch(getMoves()); // Fetch all moves
      return () => {
        dispatch(reset());
      };
    }, [id, user, isError, message, navigate, dispatch]);
    
  

  return (
    <>
 
    {!isLoading && !isError && (
        <div className="mx-auto w-100 card p-9">
            <Link to="/transport" className="btn btn-light btn-sm w-25 d-inline ms-auto">Back</Link>
            <MovesInfoTop />
        </div>
    )}
    
    
    </>
  )
}
