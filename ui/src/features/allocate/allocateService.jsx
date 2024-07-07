import axios from "axios";

const API_URL = '/api/allocate/';




// Function to update a move by its ID
const allocateMoveById = async (moveId, moveData, token) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.put(`${API_URL}/${moveId}`, moveData, config);


    return response.data;
}






const moveService = {
  allocateMoveById
  
}

export default moveService;
