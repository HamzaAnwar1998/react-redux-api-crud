/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "./store/slices/UserSlice";
import { MetroSpinner } from "react-spinners-kit";
import { MDBBtn } from "mdb-react-ui-kit";
import { Toaster } from "react-hot-toast";
import Users from "./components/Users";
import DeleteUserModal from "./components/DeleteUserModal.jsx";

function App() {
  // redux states
  const { loading } = useSelector((state) => state.users);

  // dispatch
  const dispatch = useDispatch();

  // fetch users
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

  return (
    <>
      {loading ? (
        <div className="loading-screen">
          <MetroSpinner loading={loading} size={30} color="#14a44d" />
        </div>
      ) : (
        <div className="wrapper">
          <Toaster />
          {/* nav */}
          <div className="nav">
            <h5>React Redux Clientside API CRUD</h5>
            <MDBBtn type="button" color="success">
              Add User
            </MDBBtn>
          </div>

          {/* users table */}
          <div className="users-table-container">
            <Users handleDeleteModal={handleDeleteModal} />
          </div>
        </div>
      )}

      {/* delete user modal */}
      {deleteUserModal && (
        <DeleteUserModal
          setDeleteUserModal={setDeleteUserModal}
          deleteUserId={deleteUserId}
        />
      )}
    </>
  );
}

export default App;
