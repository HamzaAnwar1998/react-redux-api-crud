/* eslint-disable react/prop-types */
import { AnimatePresence, motion } from "framer-motion";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import { useState } from "react";
import Icon from "react-icons-kit";
import { x } from "react-icons-kit/feather/x";
import { useDispatch, useSelector } from "react-redux";
import { MetroSpinner } from "react-spinners-kit";
import { addUser } from "../store/slices/UserSlice";
import { v4 as uuidv4 } from "uuid";
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

const AddUserModal = ({ setAddUserModal }) => {
  // redux state
  const { addUserLoading, addUserData } = useSelector((state) => state.users);

  // close modal
  const handleCloseModal = () => {
    if (!addUserLoading) {
      setAddUserModal(false);
    }
  };

  // form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");

  // dispatch
  const dispatch = useDispatch();

  // form submit
  const handleAddUser = (e) => {
    e.preventDefault();
    dispatch(
      addUser({
        id: uuidv4(),
        name: fullName, // key name is name while our state name is fullName, our api required name key
        email, // when key and value names are same then we can write them as below
        phone,
        website,
        username,
      })
    ).then((res) => {
      if (!res.payload.error) {
        setAddUserModal(false);
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
            <div>Add User</div>
            <div className="cancel-icon" onClick={handleCloseModal}>
              <Icon icon={x} size={16} />
            </div>
          </div>
          <div className="modal-body">
            <form className="custom-form" onSubmit={handleAddUser}>
              {/* Full Name */}
              <MDBRow className="mb-3">
                <MDBCol className="col-12 col-md-12 mb-2 mb-md-0">
                  <label htmlFor="Full Name">Full Name</label>
                  <input
                    type="text"
                    className="custom-input"
                    placeholder="Full Name"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    autoComplete="new-full-name"
                  />
                </MDBCol>
              </MDBRow>

              {/* Email */}
              <MDBRow className="mb-3">
                <MDBCol className="col-12 col-md-12 mb-2 mb-md-0">
                  <label htmlFor="Email">Email</label>
                  <input
                    type="email"
                    className="custom-input"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="new-email-alias"
                  />
                </MDBCol>
              </MDBRow>

              {/* Username */}
              <MDBRow className="mb-3">
                <MDBCol className="col-12 col-md-12 mb-2 mb-md-0">
                  <label htmlFor="Username">Username</label>
                  <input
                    type="text"
                    className="custom-input"
                    placeholder="Username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="new-user-name"
                  />
                </MDBCol>
              </MDBRow>

              {/* Phone */}
              <MDBRow className="mb-3">
                <MDBCol className="col-12 col-md-12 mb-2 mb-md-0">
                  <label htmlFor="Phone">Phone</label>
                  <input
                    type="tel"
                    pattern="[0-9]{10,15}"
                    title="Please enter a valid phone number with 10 to 15 digits."
                    className="custom-input"
                    placeholder="Phone"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    autoComplete="new-phone"
                  />
                </MDBCol>
              </MDBRow>

              {/* Website */}
              <MDBRow className="mb-3">
                <MDBCol className="col-12 col-md-12 mb-2 mb-md-0">
                  <label htmlFor="Website">Website</label>
                  <input
                    type="text"
                    className="custom-input"
                    placeholder="Website"
                    required
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    autoComplete="new-website"
                  />
                </MDBCol>
              </MDBRow>

              {addUserData?.error && (
                <div className="error-msg">{addUserData.error}</div>
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
                  type="submit"
                  className="submit success"
                  disabled={addUserLoading}
                >
                  {addUserLoading ? (
                    <MetroSpinner
                      loading={addUserLoading}
                      size={22}
                      color="#fff"
                    />
                  ) : (
                    "ADD"
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddUserModal;
