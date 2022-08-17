import React, { useState } from "react";
import { NavLink } from "react-bootstrap";
import { useNavigate } from "react-router-dom"

function handleChange(){
    
}

function Login() {
    const [loginSignUp, setLoginSignUp] = useState('login');
    const navigate = useNavigate();

    const onChange = () =>{
        loginSignUp === 'signup'
        ? setLoginSignUp('login')
        : setLoginSignUp('signup');
    }

    const handleReset = () => {
        console.log("clicked")
        navigate('/resetPass');
    };

    return (
        <>
        <div className="container" style={{ marginTop: "100px"}}>
        <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-5">
                        <div className="login-wrap p-4 p-md-5">
                            <div className="icon d-flex align-items-center justify-content-center">
                                <span className="fa fa-user-o"></span>
                            </div>
                                    <h3 className="text-center mb-4">
                                    {loginSignUp === 'signup' ? (
                                        <>
                                        Glad to see You!

                                        </>
                                    ) : (
                                        <>
                                        Hi Welcome Back!
                                        </>
                                    )}
                                    </h3>
                                    <form action="#" className="login-form">
                                        <div className="form-group">
                                            <i className="fa fa-user" style={{position:"absolute",paddingLeft: "15px",paddingTop: "17px"}}></i>
                                            <input type="text" className="form-control rounded-left" style={{paddingLeft: "45px"}} placeholder="Username" required/>
                                        </div>
                                        <div className="form-group d-flex">
                                            <i className="fa fa-lock" style={{position:"absolute",paddingLeft: "15px",paddingTop: "17px"}}></i>
                                            <input type="password" className="form-control rounded-left" style={{paddingLeft: "45px"}} placeholder="Password" required/>
                                        </div>
                                        {loginSignUp === 'login' ? (
                                        <>
                                        <div className="form-group d-md-flex">
                                            <div className="w-50">
                                                <label className="checkbox-wrap checkbox-primary">Remember Me
                                                <input 
                                                    type="checkbox" 
                                                    className="custom-control-input"
                                                    onChange={handleChange}/>
                                                    <span className="checkmark"></span>
                                                </label>
                                            </div>
                                            <div className="w-50 text-md-right">
                                                <label className="checkbox-wrap checkbox-primary" onClick={handleReset}>Forgot Password</label>
                                            </div>
                                        </div>
                                        </>
                                        ) : (
                                            <></>
                                        )}
                                        
                                        <div className="form-group">
                                            {loginSignUp === 'signup' ? (
                                                <>
                                                <span style={{display:"inline-block"}}>Already have an account?</span>
                                                <NavLink style={{display:"inline-block"}} className="text-md-right" onClick={onChange}>
                                                    <u>Login</u>
                                                </NavLink>
                                                </>                                                
                                            ) : (
                                                <>
                                                <span style={{display:"inline-block"}}>Don't have an account yet?</span>
                                                <NavLink style={{display:"inline-block"}} className="text-md-right" onClick={onChange}>
                                                    <u>Sign Up</u>
                                                </NavLink>
                                                </>
                                                
                                            )}                                            
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary rounded submit p-3 px-5">
                                                {loginSignUp === 'signup' ? 'SIGN UP' : 'LOGIN'} 
                                            </button>
                                        </div>
                                    </form>
                        </div>
                    </div>
		</div>
        </div>
        
        </>
    )


}

export default Login;