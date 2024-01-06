import Search from "../Search";
import UserTable from "../UserTable";
import { useEffect, useReducer } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialState = {
  users: [],
  metaData: {},
  page: 1,
  status: "isLoading",
  search: "",
  message: "",
  jwt: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "setJWT":
      return {
        ...state,
        jwt: action.payload,
      };
    case "dataReceived": {
      const { docs, ...metaData } = action.payload;
      return {
        ...state,
        users: docs,
        metaData: metaData,
        status: "ready",
      };
    }
    case "dataFailed":
      return {
        ...state,
        status: "error",
        message: action.payload,
      };
    case "search":
      return {
        ...state,
        search: action.payload,
        page: 1,
        status: "isLoading",
      };
    case "nextPage":
      return {
        ...state,
        page: state.page + 1,
        status: "isLoading",
      };
    case "prevPage":
      return {
        ...state,
        page: state.page - 1,
        status: "isLoading",
      };
    case "updateUserValidation": {
      const updatedUsers = state.users.map((user) =>
        user._id === action.payload.id
          ? { ...user, isValidated: action.payload.isValidated }
          : user
      );
      return {
        ...state,
        status: "success",
        users: updatedUsers,
        message: action.payload.message,
      };
    }
    case "isLoading":
      return {
        ...state,
        status: "isLoading",
      };
    case "resetStatus":
      return {
        ...state,
        status: "ready",
      };
    default:
      throw new Error("Invalid action");
  }
}
function Users() {
  const navigate = useNavigate();
  const [{ users, page, status, search, metaData, message, jwt }, dispatch] =
    useReducer(reducer, initialState);

  useEffect(() => {
    const storedJWT = localStorage.getItem("jwt");
    if (storedJWT) {
      dispatch({ type: "setJWT", payload: storedJWT });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function fetchUsers() {
      try {
        const response = await axios.get(`http://localhost:3000/users`, {
          params: {
            page: page,
            text: search,
          },
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
          signal: signal,
        });
        if (response.status === 200) {
          dispatch({ type: "dataReceived", payload: response.data });
        } else navigate("/login");
      } catch (error) {
        dispatch({ type: "dataFailed", payload: "Error fetching users" });
      }
    }

    fetchUsers();

    return () => {
      abortController.abort();
    };
  }, [page, search, jwt, navigate]);

  return (
    <div className="flex flex-col w-screen pt-16 px-8">
      <Search search={search} dispatch={dispatch} />
      <UserTable
        status={status}
        users={users}
        dispatch={dispatch}
        metaData={metaData}
        message={message}
        jwt={jwt}
      />
    </div>
  );
}

export default Users;
