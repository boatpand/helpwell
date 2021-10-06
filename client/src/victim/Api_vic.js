import axios from "axios";

const api = "http://localhost:4000";

export const insertCount = (data) => {
  return axios
    .post(api + "/request/insert-count", {
      data: data,
    })
    .then((response) => response.data)
    .catch((err) => {
      Promise.reject(err);
    });
};

export const insertName = (data) => {
  console.log("before axios",data);
  return axios
    .post(api + "/request/insert-name", data)
    .then((res) => res.data)
    .catch((err) => {
      Promise.reject(err);
    });
};
