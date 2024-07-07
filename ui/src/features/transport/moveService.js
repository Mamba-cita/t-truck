import axios from "axios";

const API_URL = '/api/moves/';


// create new customer

const createMove = async (moveData, token) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.post(API_URL, moveData, config)
    

    return response.data;
}


// create get customer

const getMoves = async (token) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL, config)

    return response.data;
}

// Function to get a move by its ID
const getMoveById = async (moveId, token) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(`${API_URL}/${moveId}`, config);

    return response.data;
}

// Function to update a move by its ID
const updateMoveById = async (moveId, moveData, token) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.put(`${API_URL}/${moveId}`, moveData, config);


    return response.data;
}


// Function to delete a move by its ID
const deleteMoveById = async (moveId, token) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.delete(`${API_URL}/${moveId}`, config);

    return response.data;
}




const moveService = {
  createMove,
  getMoves,
  getMoveById,
  updateMoveById,
  deleteMoveById
}

export default moveService;
