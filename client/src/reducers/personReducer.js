import {
  FETCH_USERS,
  ADD_USER,
  DELETE_USER,
  EDIT_USER,
  SORT_USER,
  FILTER_USER,
} from "../actions/types";

const initialState = {
  items: [],
  item: {},
  direction: {
    firstName: "asc",
    lastName: "asc",
    age: "asc",
    gender: "asc",
  },
  search: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS:
      console.log("reducer");
      return {
        ...state,
        items: action.payload,
      };
    case ADD_USER:
      return {
        ...state,
        item: action.payload,
      };
    case DELETE_USER:
      return {
        ...state,
        items: state.items.filter((el) => el.id !== action.payload),
      };
    case EDIT_USER:
      return {
        ...state,
        items: state.items.map((data) =>
          data.id === action.payload.id
            ? {
                ...data,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                age: action.payload.age,
                gender: action.payload.gender,
              }
            : data
        ),
      };
    case SORT_USER:
      console.log("sort reducer...");
      let name = action.payload;
      return {
        ...state,
        items: [
          ...state.items.sort((a, b) =>
            state.direction[name] === "asc"
              ? a[name] < b[name] && -1
              : a[name] > b[name] && -1
          ),
        ],
        direction: {
          [name]: state.direction[name] === "asc" ? "desc" : "asc",
        },
      };
    case FILTER_USER:
      console.log("sort filter");
      const { search } = action;
      // console.log(search);

      const items = state.items.filter(
        (item) =>
          item.firstName.toLowerCase().includes(search.toLowerCase()) ||
          item.lastName.toLowerCase().includes(search.toLowerCase()) ||
          item.age.toString().includes(search.toString()) ||
          item.gender.toLowerCase().includes(search.toLowerCase())
      );
      return { ...state, items, search };

    // items: [...state.items.filter((item)=>
    //   return (
    //       user.firstName.toLowerCase().includes(search.toLowerCase()) ||
    //   user.lastName.toLowerCase().includes(search.toLowerCase()) ||
    //   user.age.toString().includes(search.toString()) ||
    //   user.gender.toLowerCase().includes(search.toLowerCase())
    //   )]}

    default:
      return state;
  }
}
