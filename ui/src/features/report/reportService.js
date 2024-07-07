import axios from "axios";

const API_URL = '/api/reports/';



const getAllReports = async (token) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL, config)

    return response.data;
}


const reportService = {
  getAllReports,

}

export default reportService;
