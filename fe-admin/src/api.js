import axios from "axios";

const BASE_URL = "http://Localhost:2001";

export const getUsers = ()=>axios.get(`${BASE_URL}/users`);
export const getUser = ()=>axios.get(`${BASE_URL}/user`);