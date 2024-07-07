import axios from "axios";

const API_URL = '/api/fuel/';



const createFuelOrder = async (fuelData, token) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.post(API_URL, fuelData, config)

    return response.data;
}



const getAllFuelRecords = async (token) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL, config)

    return response.data;
}

const getFuelRecordsById = async (fuelId, token) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(`${API_URL}/${fuelId}`, config);

    return response.data;
}

const updateFuelById = async (fuelId, fuelData, token) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.put(`${API_URL}/${fuelId}`, fuelData, config);

    return response.data;
}


const deleteFuelById = async (fuelId, token) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.delete(`${API_URL}/${fuelId}`, config);

    return response.data;
}




const fuelService = {
createFuelOrder,
getAllFuelRecords,
getFuelRecordsById,
  updateFuelById,
  deleteFuelById
}

export default fuelService;
