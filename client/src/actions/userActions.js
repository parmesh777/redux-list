import {
  FETCH_USERS,
  ADD_USER,
  DELETE_USER,
  EDIT_USER,
  SORT_USER,
  FILTER_USER,
} from "./types";
import axios from "axios";

export const fetchUsers = () => (dispatch) => {
  console.log("fetching..");
  axios
    .get("/api/users")
    .then((res) =>
      dispatch({
        type: FETCH_USERS,
        payload: res.data,
      })
    )
    .catch((error) => {
      console.log(error);
    });
};

export const addUser = (userData) => {
  if (userData.id) {
    return (dispatch) => {
      return axios
        .put("/api/users/" + userData.id, userData)
        .then((res) => {
          const id = res.data;
          axios.get("/api/users/" + id).then((res) => {
            dispatch({ type: EDIT_USER, payload: res.data });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
  } else {
    return (dispatch) => {
      return axios
        .post("/api/users", userData)
        .then((res) => {
          const id = res.data;
          axios.get("/api/users/" + id).then((res) => {
            dispatch({ type: ADD_USER, payload: res.data });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
  }
};

export const deleteUser = (id) => (dispatch) => {
  console.log("deleted..");
  axios
    .delete("/api/users/" + id)
    .then((res) =>
      dispatch({
        type: DELETE_USER,
        payload: id,
      })
    )
    .catch((error) => {
      console.log(error);
    });
};

export function sortUser(name) {
  console.log("sorting...");
  return (dispatch) => {
    return dispatch({
      type: SORT_USER,
      payload: name,
    });
  };
}
export function filterUser(search) {
  console.log("filtering...");
  return (dispatch) => {
    return dispatch({
      type: FILTER_USER,
      search,
    });
  };
}
