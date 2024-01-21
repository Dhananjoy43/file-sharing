import axios from 'axios';

// const SERVER_URL = import.meta.env.VITE_REACT_SERVER_URL;
const SERVER_URL = "https://cloud-share-server.onrender.com"

export const uploadFile = async (data) => {
    try {
        const response = await axios.post(`${SERVER_URL}/upload`, data);
        console.log(response.status);
        // return response.data;
        return {
            data: response.data,
            status: response.status
        }
    } catch (error) {
        if (error.response) {
            console.log("Error while calling the api: ", error.response.status, error.response.statusText)
        } else if (error.request) {
            console.log("No response received: ", error.request)
        } else {
            console.log("Error while making the request: ", error.message)
        }
    }
}