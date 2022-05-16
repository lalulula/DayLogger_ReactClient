import React  from 'react';
import defaultpImg from '../defaultpImg.jpg'

function ProfilePage(){
  const handleImageSelected = () =>{

  }

  const handleRemoveImage = () =>{

  }
    return(
      <div className='profileContainer'>

        <div><h3>EditProfile</h3></div>

        <div className='profileDiv1'>
          <div className='profileHeader'>Profile Photo</div>
          <div className='changePIMG'>
            <img className='profileImage' src={defaultpImg}/>
            <input type="file" id="file-input" onChange={handleImageSelected}></input>
            <label htmlFor="file-input" style={{fontSize:'15px'}} className="handleImageBtn"><span>Add New Image</span></label>
            <span onClick={handleRemoveImage} className="handleImageBtn">Remove Image</span>
          </div>
        </div>

        <div className='profileDiv2'>
          Name<br/>
          <input type="text" name='name' style={{marginTop:"10px", width: "-webkit-fill-available"}}/>
        </div>

        <div className='profileDiv3'>
          Email<br/>
          <input type="text" name='email' style={{marginTop:"10px", width: "-webkit-fill-available"}}/>
        </div>

        <div className='profileDiv4'> 
          Address<br/>
          <input type="text" name='address1' style={{marginTop:"10px", width: "-webkit-fill-available"}}/><br/>
          <input type="text" name='address2' style={{marginTop:"10px", width: "-webkit-fill-available"}}/>
        </div>

        <div className='profileDiv5'>
          <button className='saveBtn'>Save</button>
          <span>Logout</span>
        </div>


      </div>
    );
};
 
export default ProfilePage;