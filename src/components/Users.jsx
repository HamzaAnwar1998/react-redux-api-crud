/* eslint-disable react/prop-types */
import { MDBBtn, MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import Icon from "react-icons-kit";
import { software_pencil } from "react-icons-kit/linea/software_pencil";
import { basic_trashcan_remove } from "react-icons-kit/linea/basic_trashcan_remove";
import { useSelector } from "react-redux";

const Users = ({ handleDeleteModal, handleEditModal }) => {
  const { data, error } = useSelector((state) => state.users);

  return (
    <>
      {error ? (
        <div className="error-msg">{error}</div>
      ) : (
        <>
          {data && data.length > 0 ? (
            <MDBTable align="middle">
              <MDBTableHead className="thead">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Username</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Website</th>
                  <th scope="col">Actions</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {data.map((data) => {
                  // Splitting the full name into an array of words
                  const nameParts = data.name.split(" ");

                  // Taking the first letter of the first and last name
                  const initials =
                    nameParts.length > 1
                      ? nameParts[0].charAt(0) +
                        nameParts[nameParts.length - 1].charAt(0)
                      : nameParts[0].charAt(0);
                  return (
                    <tr key={data.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div
                            style={{
                              width: "45px",
                              height: "45px",
                              background: "#14a44d",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#fff",
                            }}
                            className="rounded-circle"
                          >
                            {initials}
                          </div>
                          <div className="ms-3">
                            <p className="fw-bold mb-1">{data.name}</p>
                            <p className="text-muted mb-0">{data.email}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="fw-normal mb-1">{data.username}</p>
                      </td>
                      <td>{data.phone}</td>
                      <td>{data.website}</td>
                      <td>
                        <MDBBtn
                          color="link"
                          rounded
                          size="sm"
                          onClick={() => handleEditModal(data)}
                        >
                          <Icon icon={software_pencil} size={22} />
                        </MDBBtn>
                        <MDBBtn
                          color="link"
                          rounded
                          size="sm"
                          onClick={() => handleDeleteModal(data.id)}
                        >
                          <Icon icon={basic_trashcan_remove} size={22} />
                        </MDBBtn>
                      </td>
                    </tr>
                  );
                })}
              </MDBTableBody>
            </MDBTable>
          ) : (
            <div className="error-msg">No User Record Found</div>
          )}
        </>
      )}
    </>
  );
};

export default Users;
