/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUsers } from "./store/slices/UserSlice";
import { MDBBtn } from "mdb-react-ui-kit";
import { Toaster } from "react-hot-toast";
import Users from "./components/Users";
import DeleteUserModal from "./components/DeleteUserModal.jsx";
import AddUserModal from "./components/AddUserModal.jsx";
import EditUserModal from "./components/EditUserModal.jsx";

function App() {
  // dispatch
  const dispatch = useDispatch();

  // fetch users, we are calling this function on app render and we immediately need loading as true
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  // delete user states
  const [deleteUserModal, setDeleteUserModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);

  const handleDeleteModal = (id) => {
    setDeleteUserModal(true);
    setDeleteUserId(id);
  };

  // add user states
  const [addUserModal, setAddUserModal] = useState(false);

  // edit user states
  const [editUserModal, setEditUserModal] = useState(false);
  const [editUserObj, setEditUserObj] = useState(null);

  const handleEditModal = (obj) => {
    setEditUserModal(true);
    setEditUserObj(obj);
  };

  return (
    <>
      <div className="wrapper">
        <Toaster />
        {/* nav */}
        <div className="nav">
          <h5>React Redux Clientside API CRUD</h5>
          <MDBBtn
            type="button"
            color="success"
            onClick={() => setAddUserModal(true)}
          >
            Add User
          </MDBBtn>
        </div>

        {/* users table */}
        <div className="users-table-container">
          <Users
            handleDeleteModal={handleDeleteModal}
            handleEditModal={handleEditModal}
          />
        </div>
      </div>
      {/* delete user modal */}
      {deleteUserModal && (
        <DeleteUserModal
          setDeleteUserModal={setDeleteUserModal}
          deleteUserId={deleteUserId}
        />
      )}

      {/* add user modal */}
      {addUserModal && <AddUserModal setAddUserModal={setAddUserModal} />}

      {/* edit user modal */}
      {editUserModal && (
        <EditUserModal
          setEditUserModal={setEditUserModal}
          editUserObj={editUserObj}
        />
      )}
    </>
  );
}

export default App;
