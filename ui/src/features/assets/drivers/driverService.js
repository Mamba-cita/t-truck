import axios from "axios";

const API_URL = '/api/drivers/';


// create new driver

const createDriver = async (driverData, token) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.post(API_URL, driverData, config)

    return response.data;
}


// create get drivers

const getDrivers = async (token) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL, config)

    return response.data;
}


const driverService = {
    createDriver,
    getDrivers,
}

export default driverService;
