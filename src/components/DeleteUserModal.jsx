/* eslint-disable react/prop-types */
import { AnimatePresence, motion } from "framer-motion";
import Icon from "react-icons-kit";
import { x } from "react-icons-kit/feather/x";
import { useDispatch, useSelector } from "react-redux";
import { MetroSpinner } from "react-spinners-kit";
import { deleteUser } from "../store/slices/UserSlice";
import toast from "react-hot-toast";

// backshadow variants
const backVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

// modal variants
const modalVariants = {
  hidden: {
    scale: 0,
  },
  visible: {
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const DeleteUserModal = ({ setDeleteUserModal, deleteUserId }) => {
  // redux state
  const { deleteUserLoading, deleteUserData } = useSelector(
    (state) => state.users
  );

  // close modal
  const handleCloseModal = () => {
    if (!deleteUserLoading) {
      setDeleteUserModal(false);
    }
  };

  // dispatch
  const dispatch = useDispatch();

  // delete user
  const handleDeleteUser = () => {
    dispatch(deleteUser({ id: deleteUserId })).then((res) => {
      if (!res.payload.error) {
        setDeleteUserModal(false);
        toast.success(`${res.payload.successMsg}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        className="backdrop"
        variants={backVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="custom-modal"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="modal-header">
            <div>Delete User - {deleteUserId}</div>
            <div className="cancel-icon" onClick={handleCloseModal}>
              <Icon icon={x} size={16} />
            </div>
          </div>
          <div className="modal-body">
            <div className="delete-consequences-container">
              <p style={{ color: "#DC3545" }}>
                Are you sure you want to delete this user?
              </p>
              <p style={{ color: "#6a6c6f" }}>You cannot undo this action.</p>
            </div>

            {deleteUserData &&
              deleteUserData.error &&
              deleteUserData.id === deleteUserId && (
                <div className="error-msg">{deleteUserData.error}</div>
              )}

            <div className="submit-and-cancel-div">
              <button
                type="button"
                className="cancel"
                onClick={handleCloseModal}
              >
                CANCEL
              </button>
              <button
                className="submit danger"
                disabled={deleteUserLoading}
                onClick={handleDeleteUser}
              >
                {deleteUserLoading ? (
                  <MetroSpinner
                    loading={deleteUserLoading}
                    size={22}
                    color="#fff"
                  />
                ) : (
                  "DELETE"
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DeleteUserModal;
