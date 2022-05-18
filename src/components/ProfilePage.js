import React from "react";
import defaultpImg from "../defaultpImg.jpg";

function ProfilePage() {
  const handleImageSelected = () => {};

  const handleRemoveImage = () => {};
  return (
    <div className="profileContainer">
      <div>
        <h3>EditProfile</h3>
      </div>

      <div className="profileDiv1">
        <div className="profileHeader">Profile Photo</div>
        <div className="changePIMG">
          <img className="profileImage" src={defaultpImg} />
          <input
            type="file"
            id="file-input"
            onChange={handleImageSelected}
          ></input>
          <label
            htmlFor="file-input"
            style={{ fontSize: "15px" }}
            className="handleImageBtn"
          >
            <span className="put-img-box">Choose new image</span>
          </label>
          <span
            onClick={handleRemoveImage}
            className="handleImageBtn removeImage"
          >
            Remove Image
          </span>
        </div>
      </div>

      <div className="profileDiv2">
        Name
        <br />
        <input
          type="text"
          name="name"
          style={{
            marginTop: "10px",
            width: "-webkit-fill-available",
            padding: "7px",
            borderRadius: "5px",
          }}
        />
      </div>

      <div className="profileDiv3">
        Email
        <br />
        <input
          type="text"
          name="email"
          style={{
            marginTop: "10px",
            width: "-webkit-fill-available",
            padding: "7px",
            borderRadius: "5px",
          }}
        />
      </div>

      <div className="profileDiv4">
        Address
        <br />
        <input
          type="text"
          name="address1"
          style={{
            marginTop: "10px",
            width: "-webkit-fill-available",
            padding: "7px",
            borderRadius: "5px",
          }}
        />
        <br />
        <input
          type="text"
          name="address2"
          style={{
            marginTop: "10px",
            width: "-webkit-fill-available",
            padding: "7px",
            borderRadius: "5px",
          }}
        />
      </div>

      <div className="profileDiv5">
        <button className="saveBtn saveBtnforProfile">Save</button>
        <span
          style={{
            textDecoration: "underline",
            fontSize: "medium",
            cursor: "pointer",
          }}
        >
          Logout
        </span>
      </div>
    </div>
  );
}

export default ProfilePage;
