import axios from "axios";
axios.defaults.baseURL = import.meta.env?.VITE_APP_BASEURL;

export default axios;
