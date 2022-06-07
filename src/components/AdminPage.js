import React, { useEffect } from "react";
import { deleteUserByIdAPI } from "../api/userAPI";
import { deleteQuestionAPI } from "../api/questionAPI";

const AdminPage = ({ getAllUsers, allUsers }) => {
  var totalUsers = (totalUsers = allUsers.length - 1);
  useEffect(() => {
    getAllUsers();
    console.log(allUsers);
  }, []);

  const deleteUser = (user) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${user?.name}'s infromation?`
      )
    ) {
      deleteUserByIdAPI(user?._id).then((res) => getAllUsers());
    }
  };
  return (
    <>
      <div style={{ textAlign: "-webkit-center" }}>
        <div style={{ width: "100%", maxWidth: "600px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h2>Admin Page</h2>
            <div
              style={{
                fontWeight: "500",
              }}
            >
              Total Users: {totalUsers < 0 ? 0 : totalUsers}
            </div>
          </div>
        </div>

        {allUsers.map(
          (user) =>
            !user.isAdmin && (
              <div
                key={user._id}
                style={{
                  backgroundColor: "white",
                  borderRadius: "5px",
                  width: "100%",
                  maxWidth: "600px",
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "15px",
                }}
              >
                <div style={{ padding: "15px", textAlign: "left" }}>
                  <div style={{ padding: "1px" }}>User name: {user?.name}</div>
                  <div style={{ padding: "1px" }}>
                    User email address: {user?.email}
                  </div>
                  <div style={{ padding: "1px" }}>
                    Number of questions created: {user?.questions}
                  </div>
                  <div style={{ textAign: "left", padding: "1px" }}>
                    Number of responses logged total: {user?.responses}
                  </div>
                </div>
                <button
                  className="userdata-delete-btn"
                  style={{
                    height: "20px",
                    marginTop: "80px",
                    marginRight: "10px",
                  }}
                  onClick={() => deleteUser(user)}
                >
                  DELETE
                </button>
              </div>
            )
        )}
      </div>
    </>
  );
};

export default AdminPage;
