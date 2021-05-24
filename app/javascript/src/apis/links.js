import axios from "axios";

const list = () => axios.get("/links");

const update = slug => axios.put(`/links/${slug}`);

const create = payload => axios.post("/links/", payload);

const linksApi = {
  list,
  update,
  create,
};

export default linksApi;
