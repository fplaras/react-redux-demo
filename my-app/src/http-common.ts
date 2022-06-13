import axios from "axios";
export default axios.create({
  baseURL: "https://hosing-demo-api.azurewebsites.net/api",
  headers: {
    "Content-type": "application/json"
  }
});