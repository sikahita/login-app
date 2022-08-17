import React, { useState } from "react";
import { NavLink } from "react-bootstrap";
import * as yup from 'yup';
import { useAuth } from "../contexts/Auth";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import supabase from "../supabaseClient";

function handleChange(){
    
}

export default function Login() {
    const schema = yup.object().shape({
        username: yup.string().required(),
        password: yup.string().required('Password is required')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&_])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
        email: yup.string().email('Invalid email').required('Required'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    const [formData, setFormData] = useState();
    const [loginSignUp, setLoginSignUp] = useState('login');
	const { user, signUp, signIn } = useAuth();
    console.log(loginSignUp)

    const onChange = () =>{
        loginSignUp === 'signup'
        ? setLoginSignUp('login')
        : setLoginSignUp('signup');
    }

    const onSubmit = async data => {
        console.log(data)

        console.log(loginSignUp)

        if (loginSignUp === 'signup') {
            console.log(data)
            const { user, session, error } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
            });
            
            error ? console.log(error) : console.log(user);
			// const { error } = await signUp({
			// 	email: data.email,
			// 	password: data.password,
			// });
			// if (error) {
            //     console.log(error.message);
			// 	setAuthError(error.message);
			// }
		}
		if (loginSignUp === 'login') {
			// const { error } = await signIn({
			// 	email: data.email,
			// 	password: data.password,
			// });
			// if (error) {
			// 	setAuthError(error.message);
			// }
            const { user, session, error } = await supabase.auth.signIn({
                email: data.email,
                password: data.password,
            });
            
            error ? console.log(error) : console.log("Kamu berhasil login");
		}
    }
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
                                    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                                        {loginSignUp === 'signup' ? (
                                            <div className="form-group">
                                                <i className="fa fa-user" style={{position:"absolute",paddingLeft: "15px",paddingTop: "17px"}}></i>
                                                <input 
                                                    type="text"
                                                    placeholder="Username"
                                                    aria-describedby="inputGroupPrepend"
                                                    name="username"
                                                    onChange={(e) =>
                                                        setFormData({ ...formData, username: e.target.value })
                                                    }
                                                    {...register('username')}
                                                    className={`form-control rounded-left ${errors.username ? 'is-invalid' : ''}`} 
                                                    style={{paddingLeft: "45px"}} 
                                                />
                                                <div className="invalid-feedback">{errors.username?.message}</div>						
                                            </div>
                                        ) : (
                                            <></>
                                        )}
                                        <div className="form-group">
                                            <i className="fa fa-envelope" style={{position:"absolute",paddingLeft: "15px",paddingTop: "17px"}}></i>
                                            <input 
                                                type="email"
                                                placeholder="Email"
                                                aria-describedby="inputGroupPrepend"
                                                name="email"
                                                onChange={(e) =>
                                                    setFormData({ ...formData, email: e.target.value })
                                                    }
                                                {...register('email')}
                                                className={`form-control rounded-left ${errors.email ? 'is-invalid' : ''}`} 
                                                style={{paddingLeft: "45px"}} 
                                            />
                                            <div className="invalid-feedback">{errors.email?.message}</div>						
                                        </div>
                                        <div className="form-group">
                                            <i className="fa fa-lock" style={{position:"absolute",paddingLeft: "15px",paddingTop: "17px"}}></i>
                                            <input 
                                                type="password" 
                                                placeholder="Password"
                                                aria-describedby="inputGroupPrepend"
                                                name="password"
                                                onChange={(e) =>
                                                    setFormData({ ...formData, password: e.target.value })
                                                }
                                                {...register('password')}
                                                className={`form-control rounded-left ${errors.password ? 'is-invalid' : ''}`} 
                                                style={{paddingLeft: "45px"}} 
                                            />
                                            <div className="invalid-feedback">{errors.password?.message}</div>						
                                        </div>
                                        {loginSignUp === 'login' ? (
                                        <>
                                        <div className="form-group d-md-flex">
                                            <div className="w-50">
                                                <label className="checkbox-wrap checkbox-primary">Remember Me
                                                <input 
                                                    type="checkbox" 
                                                    className="custom-control-input"
                                                    onChange={handleChange}
                                                    id="cod"/>
                                                    <span className="checkmark"></span>
                                                </label>
                                            </div>
                                            <div className="w-50 text-md-right">
                                                <a href="">Forgot Password</a>
                                            </div>
                                        </div>
                                        </>
                                        ) : (
                                            <></>
                                        )}
                                        
                                        <div className="form-group">
                                            {loginSignUp === 'signup' ? (
                                                <>
                                                <span style={{display:"inline-block"}}>Already have an Account?</span>
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

// export default Login;