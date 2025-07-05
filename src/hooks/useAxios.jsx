import axios from 'axios';


const axiosUserSecure = axios.create({
    baseURL: `http://localhost:3000/`
})

const useAxios = () => {
    return axiosUserSecure;
};

export default useAxios;