import axios from "axios";

const API_URL = '/api/trailers/';


// create new trailer

const createTrailer = async (trailerData, token) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.post(API_URL, trailerData, config)

    return response.data;
}


// create get trailers

const getTrailers = async (token) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL, config)

    return response.data;
}


const trailerService = {
    createTrailer,
    getTrailers,
}

export default trailerService;
