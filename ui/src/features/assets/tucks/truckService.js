import axios from "axios";

const API_URL = '/api/trucks/';


// create new truck

const createTruck = async (truckData, token) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.post(API_URL, truckData, config)

    return response.data;
}


// create get trucks

const getTrucks = async (token) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL, config)

    return response.data;
}


const truckService = {
    createTruck,
    getTrucks,
}

export default truckService;
