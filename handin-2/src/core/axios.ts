import axios from "axios";

const API = axios.create({
    baseURL: "https://fitnessbackend2022.azurewebsites.net/api/"
});

export default API