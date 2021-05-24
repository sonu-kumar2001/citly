import axios from "axios";

const list = () => axios.get("/links");

const update = slug => axios.put(`/links/${slug}`);

const create = payload => axios.post("/links/", payload);

const show = slug => axios.get("/links/" + slug);

const linksApi = {
  list,
  update,
  create,
  show,
};

export default linksApi;
