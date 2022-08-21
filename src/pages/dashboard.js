import React from "react";
import { useAuth } from "../contexts/Auth";
import { useNavigate } from "react-router-dom"

function Dashboard() {
    const { user, signOut } = useAuth()
    const navigate = useNavigate();


    async function handleSignOut() {
      // Redirects the user to Login page
      navigate('/')

      // Ends user session
      await signOut()
    }
    return (
        <>
        <div className="container" style={{ marginTop: "100px"}}>
        <h3>Hi, {user?.email}!</h3>
            <p>
              Welcome to Admin Dashboard System. <br/>This website was created by Salsa Dian Sikahita - 2301928036
            </p> 
            <br/>
            <button className="btn btn-primary rounded p-3 px-5" onClick={handleSignOut}>Sign out</button>
		    </div>
        </>
    )


}

export default Dashboard;