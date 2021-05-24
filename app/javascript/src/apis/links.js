import axios from "axios";

const list = () => axios.get("/links");

const linksApi = {
  list,
};

export default linksApi;
