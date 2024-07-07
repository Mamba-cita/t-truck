
import { Typography, Box, useTheme } from "@mui/material";
import React from "react";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  return (
    <Box>
      <Typography
        variant="h2"
        color={theme.palette.secondary[100]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={theme.palette.secondary[300]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;


// import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { logout, reset } from "../features/auth/authSlice";

// export default function Header() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { user } = useSelector((state) => state.auth);

//   const onLogout = () => {
//     dispatch(logout());
//     dispatch(reset());
//     navigate("/register");
//   }

//   return (
//     <div className="header">
//       <div className="logo">
//         <Link to="/">app</Link>
//       </div>
//       <ul>
//         {user ? (
//           <li>
//             <button className="btn" onClick={onLogout}>
//             <FaSignOutAlt />
//               logut
//             </button>
            
//           </li>
//         ) : (
//           <>
//             {" "}
//             <li>
//               <Link to="/register">
//                 <FaUser />
//                 Register
//               </Link>
//             </li>
//             <li>
//               <Link to="/">
//                 <FaSignInAlt />
//                 Login
//               </Link>
//             </li>
//           </>
//         )}
//       </ul>
//     </div>
//   );
// }