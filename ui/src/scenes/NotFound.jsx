import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
        <FaExclamationTriangle className="text-danger" size='5em'/>
        <h1 className="text-danger">404</h1>
        <h1 className="text-danger">The page you are looking for does not exist.</h1>
        <Link to='/dashboard' className="btn btn-primary">Go Back</Link>
    </div>
  )
}
