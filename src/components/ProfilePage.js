import React from "react";
import { useState } from "react";
import defaultpImg from "../defaultpImg.jpg";
import {
  logoutAPI,
  uploadImageToCloudinaryAPIMethod,
  updateUserAPI,
} from "../api/userAPI";

function ProfilePage({ setProfile, profile }) {
  const [img, setImg] = useState(null);
  const onSave = async (e) => {
    e.preventDefault();
    console.log("New File Selected");

    let newImg = profile.profileImage;

    if (img) {
      const formData = new FormData();
      // TODO: You need to create an "unsigned" upload preset on your Cloudinary account
      // Then enter the text for that here.
      const unsignedUploadPreset = "hwnhe2xc";
      formData.append("file", img);
      formData.append("upload_preset", unsignedUploadPreset);

      console.log("Cloudinary upload");
      const response = await uploadImageToCloudinaryAPIMethod(formData);
      console.log("Upload success");
      console.dir(response);

      newImg = response.url;
    } else if (img == "") {
      newImg = "";
    }

    // Now the URL gets saved to the author
    const updatedProfile = { ...profile, profileImage: newImg };
    // setProfile(updatedProfile);
    updateUserAPI(updatedProfile)
      .then((response) => {
        setProfile(updatedProfile);
        console.log("Updated user on the server");
      })
      .catch((err) => {
        console.log(profile);
        console.error("Error updating user data: " + err);
      });
  };

  // const handleImageSelected = (event) => {
  //   // console.log("New File Selected");
  //   // if (event.target.files && event.target.files[0]) {
  //   //     const selectedFile = event.target.files[0];
  //   //     console.dir(selectedFile);
  //   //     const formData = new FormData();
  //   //     // const unsignedUploadPreset = 'pyf8kc0j' //하니
  //   //     const unsignedUploadPreset = 'pyf8kc0j' //윤앙
  //   //     formData.append('file', selectedFile);
  //   //     formData.append('upload_preset', unsignedUploadPreset);
  //   //     console.log("Cloudinary upload");
  //   //     uploadImageToCloudinaryAPIMethod(formData).then((response) => {
  //   //         console.log("Upload success");
  //   //         console.dir(response);
  //   //         const updatedProfile = {...userProfile, "profileImage": response.url};
  //   //         updateUserProfile(updatedProfile);
  //   //     });
  //   // }
  // };

  // const handleRemoveImage = () => {
  //   // const updatedProfile = {...userProfile, "profileImage": ""};
  //   // updateUserProfile(updatedProfile);
  // };

  const handleImageSelected = (event) => {
    console.log("New File Selected");
    if (event.target.files && event.target.files[0]) {
      setImg(event.target.files[0]);
    }
  };

  const handleRemoveImage = () => {
    if (profile.profileImage) {
      // let updatedProfile = { ...profile, profileImage: "" };
      // setProfile(updatedProfile);
      setImg("");
    }
  };

  //Save the profile information
  const saveUserName = (changeUserName) => {
    setProfile({
      ...profile,
      name: changeUserName,
    });
  };

  const saveUserEmail = (changeUserEmail) => {
    setProfile({
      ...profile,
      email: changeUserEmail,
    });
  };

  const saveUserAdress = (changeUserAdress) => {
    console.log(changeUserAdress);
    setProfile({
      ...profile,
      // colorScheme: changeUserColor,
      adress: changeUserAdress,
    });
  };

  const handleLogout = async () => {
    await logoutAPI();
    setProfile(undefined);
  };
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
          value={profile?.name || ""}
          onChange={(e) => saveUserName(e.target.value)}
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
          value={profile?.email || ""}
          onChange={(e) => saveUserEmail(e.target.value)}
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
          value={profile?.adress || ""}
          onChange={(e) => saveUserAdress(e.target.value)}
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
        <button
          onClick={handleLogout}
          style={{
            textDecoration: "underline",
            fontSize: "medium",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
