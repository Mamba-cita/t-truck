import axios from "axios";

const API_URL = '/api/orders/';


// create new customer

const createOrder = async (moveData, token) => {
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

const getOrders = async (token) => {
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
const getOrderById = async (moveId, token) => {
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
const updateOrderById = async (moveId, moveData, token) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.put(`${API_URL}/${moveId}`, moveData, config);

    return response.data;
}



const orderService = {
createOrder,
  getOrders,
  getOrderById,
  updateOrderById,
}

export default orderService;
