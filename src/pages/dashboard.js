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
              Right now I'm busy working at a Payment Gateway company in Jakarta while studying at Binus Online Learning majoring in S1 Information Systems. 
              It's been almost 4 years I migrated to Jakarta, whoaa time flies! And I'm studying already in 6th semesters, yay! According to the schedule, 
              I will graduate in the middle of 2023. I hope I can graduate on time~ Aamiin
            </p> 
            <br/>
            <button className="btn btn-primary rounded p-3 px-5" onClick={handleSignOut}>Sign out</button>
		    </div>
        </>
    )


}

export default Dashboard;