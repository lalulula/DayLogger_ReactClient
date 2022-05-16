import React  from 'react';


function Login({setIsLoggedIn}){
    const handleFormSubmit = (e) =>{
        e.preventDefault();
    }
    const handleCreateNewAccount = () =>{
        document.getElementById('myModal').style.display='block'
    }
    const closeModal = () =>{
        document.getElementById('myModal').style.display= "none";
    }
    return(
        <div className='loginBody'>

            <div className="bodyContainer" style={{height: "100vh"}}>

                <div className="loginContainer">
                    <div className="loginHeader">
                        <h1 className="loginTitle">Day Logger</h1>
                    </div>
                    <form onClick={handleFormSubmit}>
                        <div className="loginForm">

                            <label htmlFor="email">Email</label>
                            <input className="loginInput email" type="email" name="Email" style={{width: '98%'}}/><br/>
    
                            <label htmlFor="password">Password</label>
                            <input className="loginInput" type="password" name="password" autoComplete="off" style={{width: '98%'}} /><br/>
                            <div id="errorMessage" ></div>
    
                            <div className="loginButtons">
                                <button className="login" >Log in</button>
                                <hr style={{marginBottom: '20px'}}/>
                                <button className="createAccount" onClick={handleCreateNewAccount} >Create New Account</button>
                            </div>
                        </div>
                    </form>
                </div>
    
                <div id="myModal" className="registerModal">
                    <div className="modal-content">
                        <div className="editRegisterContainer">
                            <div className="signUp1">
                                <h3>Sign Up</h3>
                                <span className="close" onClick={closeModal}>&times;</span>
                            </div>
                            <form onClick={handleFormSubmit}>

                                Name<br/> <input type="text" name="Name"  autoComplete="off"  style={{width: "98%", height:"20px"}}/>
                                Email<br/> <input type="email" size="30" name="Email" autoComplete="off"  style={{width: "98%", height:"20px"}}/>
                                Password<br/> <input type="password" size="30" name="password" autoComplete="off" style={{width: "98%", height:"20px"}}/>
                                <div className="signUp2">
                                    <button className="signUpBtn" > Sign Up </button>
                                </div>
                            </form>                       
                        </div>
                    </div>
                </div>

            </div>
            
        </div>
        );
};
 
export default Login;