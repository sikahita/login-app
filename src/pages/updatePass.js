import React, {useState, useEffect} from "react";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import supabase from "../supabaseClient";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom"

function PassReset(){
    const navigate = useNavigate();
    const [formData, setFormData] = useState();

    const schema = yup.object().shape({        
        password: yup.string().required('Password is required')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&_])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });
    const [hash, setHash] = useState(null);

    useEffect(() => {
        setHash(window.location.hash);
    }, []);
    const onSubmit = async datas => {
        // const notification = toast.loading("Changing Password");
        Swal.fire({
            title: 'Changing Password..!',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            customClass: {
                popup: 'border-radius-0',
            },
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
            },
        })

        try {
        // if the user doesn't have accesstoken
        if (!hash) {
            return toast.error("Sorry, Invalid token");
        } else if (hash) {
            const hashArr = hash
            .substring(1)
            .split("&")
            .map((param) => param.split("="));

            let type;
            let accessToken;
            for (const [key, value] of hashArr) {
            if (key === "type") {
                type = value;
            } else if (key === "access_token") {
                accessToken = value;
            }
            }

            if (
            type !== "recovery" ||
            !accessToken ||
            typeof accessToken === "object"
            ) {
            toast.error("Invalid access token or type");
            return;
            }

            //   now we will change the password
            const { error } = await supabase.auth.api.updateUser(accessToken, {
                password: datas.password,
            });

            if (error) {
            toast.error(error.message);
            } else if (!error) {
            Swal.hideLoading()
            Swal.fire({
            title: 'Successfully!',
            html: "Password Changed",
            type: 'success',
            confirmButtonText: 'Back to Login',
            }).then((result) => {
                navigate('/')
            })
            // toast.update(notification, { render: "Password Changed!", type: "success", isLoading: false });
            }
        }
        } catch (error) {
        console.log(error);
        toast.error("Sorry Error occured");
        }
    }

    return(
    <>
    <div className="container" style={{ marginTop: "100px"}}>
        <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-5">
                        <div className="login-wrap p-4 p-md-5">
                            <div className="icon d-flex align-items-center justify-content-center">
                                <span className="fa fa-unlock"></span>
                            </div>
                                    <h3 className="text-center mb-4">Reset Password</h3>
                                    <p className="text-center mb-4">Please enter your new password!</p>
                                    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
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
                                        <br/>
                                        <div class="form-group">
                                            <button type="submit" className="btn btn-primary rounded submit p-3 px-5">RESET PASSWORD</button>
                                        </div>
                                    </form>
                        </div>
                    </div>
		</div>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
    </>
    )
}

export default PassReset;