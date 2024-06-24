import { useState } from "react";
import "./App.css";
import Users from "./components/Users";
import { MDBBtn } from "mdb-react-ui-kit";
import { Toaster } from "react-hot-toast";
import DeleteUserModal from "./components/DeleteUserModal";
import EditUserModal from "./components/EditUserModal";
import AddUserModal from "./components/AddUserModal";

function App() {
  // delete modal
  const [deleteUserModal, setDeleteUserModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);

  const handleDeleteModal = (id) => {
    setDeleteUserModal(true);
    setDeleteUserId(id);
  };

  // edit modal
  const [editUserModal, setEditUserModal] = useState(false);
  const [editUserObj, setEditUserObj] = useState(null);

  const handleEditModal = (obj) => {
    setEditUserModal(true);
    setEditUserObj(obj);
  };

  // add modal
  const [addUserModal, setAddUserModal] = useState(false);

  return (
    <>
      <div className="wrapper">
        <Toaster />
        {/* nav */}
        <div className="nav">
          <h5>React Redux Clientside API CRUD</h5>
          <MDBBtn color="success" onClick={() => setAddUserModal(true)}>
            Add User
          </MDBBtn>
        </div>
        {/* user table */}
        <div className="users-table-container">
          <Users
            handleDeleteModal={handleDeleteModal}
            handleEditModal={handleEditModal}
          />
        </div>
      </div>
      {/* delete modal */}
      {deleteUserModal && (
        <DeleteUserModal
          setDeleteUserModal={setDeleteUserModal}
          deleteUserId={deleteUserId}
        />
      )}

      {/* edit modal */}
      {editUserModal && (
        <EditUserModal
          setEditUserModal={setEditUserModal}
          editUserObj={editUserObj}
        />
      )}

      {/* add modal */}
      {addUserModal && <AddUserModal setAddUserModal={setAddUserModal} />}
    </>
  );
}

export default App;
