import axios from "axios";

const API_URL = "http://localhost:8080/users";

const userService = {
  getUsers: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },
};

export default userService;
