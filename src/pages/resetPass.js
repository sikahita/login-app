import React, {useState} from "react";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import supabase from "../supabaseClient";

function Reset() {
    const [formData, setFormData] = useState();

    const schema = yup.object().shape({        
        email: yup.string().email('Invalid email').required('Required'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async datas => {
        const notification = toast.loading("Sending Email....");

        try {
          const {error} = await supabase.auth.api.resetPasswordForEmail(
            datas.email,
            {
              redirectTo: "http://localhost:3000/passUpdate", //// this will redirect to us at password-reset page,
              //// you can also set your own page for it.
            }
          );
    
          if (error) {
            toast.error(error.message, {
              id: notification,
            });
          } else if (datas) {
            console.log(datas);
            toast.update(notification, { render: "Email Sent! Please check your email.", type: "success", isLoading: false });
            // toast.success("Sent, Please Check Your Email!", {
            //   id: notification,
            // });
          }
        } catch (error) {
          toast.error("Sorry Error occured", {
            id: notification,
          });
        }
    }

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
                                    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
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
                                        <br/>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary rounded submit p-3 px-5">SEND EMAIL</button>
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

export default Reset;