import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-burger-45c63.firebaseio.com/"
});

export default instance;
