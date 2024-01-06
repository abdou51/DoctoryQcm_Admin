import Loader from "./Loader";
import Pagin from "./Pagin";
import Success from "./Success";
import Error from "./Error";
import axios from "axios";
import PropTypes from "prop-types";
import PassDialog from "./PassDialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

async function validateUser(id, isValidated, dispatch, jwt) {
  try {
    const response = await axios.put(
      `http://localhost:3000/users/${id}`,
      { isValidated: isValidated },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    if (response.status === 200) {
      dispatch({
        type: "updateUserValidation",
        payload: {
          id,
          isValidated,
          message: "User has been updated successfully",
        },
      });
    } else {
      dispatch({
        type: "dataFailed",
        payload: "Error Updating User: Server responded with an error",
      });
    }
  } catch (error) {
    console.error(error);
    dispatch({
      type: "dataFailed",
      payload: "Error Updating User: Request failed",
    });
  }
}

function UserTable({ status, users, dispatch, metaData, message, jwt }) {
  return (
    <div className="flex flex-col">
      <div className="mt-4">
        {status === "error" && <Error message={message} />}
        {status === "isLoading" && <Loader />}
      </div>
      {(status === "ready" || status === "success" || status === "error") && (
        <div>
          <Table className="border-solid border-2 h-full">
            <TableHeader className="bg-neutral-200">
              <TableRow className="">
                <TableHead>Email</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Creation Date</TableHead>
                <TableHead>Is Validated</TableHead>
                <TableHead>Password</TableHead>
              </TableRow>
            </TableHeader>
            {users.map((user) => (
              <TableBody key={user._id}>
                <TableRow>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phoneNumber}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.createdAt}</TableCell>
                  <TableCell>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        className="sr-only peer"
                        checked={user.isValidated}
                        onChange={(e) => {
                          validateUser(
                            user._id,
                            e.target.checked,
                            dispatch,
                            jwt
                          );
                        }}
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </TableCell>
                  <TableCell>
                    <PassDialog
                      user={user}
                      dispatch={dispatch}
                      status={status}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>

          <Pagin dispatch={dispatch} metaData={metaData} />
          {status === "success" && (
            <Success
              message={message}
              onDisappear={() => dispatch({ type: "resetStatus" })}
            />
          )}
        </div>
      )}
    </div>
  );
}

UserTable.propTypes = {
  status: PropTypes.string.isRequired,
  users: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  metaData: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,
  jwt: PropTypes.string.isRequired,
};

export default UserTable;
