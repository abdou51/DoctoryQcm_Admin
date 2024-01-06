import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

async function updateUserPassword(id, password, dispatch) {
  try {
    const response = await axios.put(`http://localhost:3000/users/${id}`, {
      password: password,
    });
    dispatch({
      type: "updateUserValidation",
      payload: {
        id,
        message: "User password has been updated successfully",
      },
    });
    return response;
  } catch (error) {
    dispatch({
      type: "dataFailed",
      payload: "Error Updating User Password",
    });
  }
}

function PassDialog({ user, dispatch }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleUpdatePassword = async () => {
    await updateUserPassword(user._id, password, dispatch);
    setIsDialogOpen(false);
    setPassword("");
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Button
        className="bg-orange-200"
        variant="outline"
        onClick={() => setIsDialogOpen(true)}
      >
        Edit Password
      </Button>
      {isDialogOpen && (
        <Dialog>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                Edit Password for
                <span className="text-green-800"> ({user.name})</span>
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-2 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-center">
                  New Password
                </Label>
                <div className="col-span-3 flex items-center">
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    className="flex-1"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button onClick={togglePasswordVisibility} className="ml-2">
                    {showPassword ? (
                      <FaRegEyeSlash size="24" />
                    ) : (
                      <FaRegEye size="24" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleUpdatePassword}>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

PassDialog.propTypes = {
  user: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default PassDialog;
