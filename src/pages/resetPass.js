import React from "react";

function Reset() {
    return (
        <>
        <div className="container" style={{ marginTop: "100px"}}>
        <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-5">
                        <div className="login-wrap p-4 p-md-5">
                            <div className="icon d-flex align-items-center justify-content-center">
                                <span className="fa fa-unlock"></span>
                            </div>
                                    <h3 className="text-center mb-4">Trouble Logging In?</h3>
                                    <p className="text-center mb-4">Enter your email and we'll send you a link to get back into your account.</p>
                                    <form action="#" className="login-form">
                                        <div className="form-group">
                                            <i className="fa fa-envelope" style={{position:"absolute",paddingLeft: "15px",paddingTop: "17px"}}></i>
                                            <input type="text" className="form-control rounded-left" style={{paddingLeft: "50px"}} placeholder="Enter Your Email" required/>
                                        </div>
                                        <br/>
                                        <div class="form-group">
                                            <button type="submit" className="btn btn-primary rounded submit p-3 px-5">RESET PASSWORD</button>
                                        </div>
                                    </form>
                        </div>
                    </div>
		</div>
        </div>
        
        </>
    )


}

export default Reset;