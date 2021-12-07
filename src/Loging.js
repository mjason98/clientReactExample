import React from "react";
import agenda from "./agenda.svg"
import { useNavigate } from 'react-router-dom' 

function Logging(props){
    const navigate = useNavigate();

    return(
        <div className="text-center">
            <form className="form-signin" onSubmit={(v) => props.handleLogging(v)}>
                <img className="mb-4" src={agenda} alt="" width="72" height="72" /> <p/>
                {/**<h1 className="mb-3 eventt-header">Please Logg in</h1>**/}
                <label htmlFor="inputEmail" className="sr-only eventt-author">Username</label>
                <input type="email" id="inputEmail" className="form-control form-BT" placeholder="username" required />
                <label htmlFor="inputPassword" className="sr-only eventt-author">Password</label>
                <input type="password" id="inputPassword" className="form-control form-BT" placeholder="password" required />
                <button className="btn-alt btn-clear" onClick={() => navigate("/sigin")}>Sigin</button>
                <button className="btn-ok btn-clear" type="submit">Log in</button>
            </form>
         </div>
    )
}

export function Siging(props){
    const navigate = useNavigate();

    return(
        <div className="text-center">
            <form className="form-signin">
                <img className="mb-4" src={agenda} alt="" width="72" height="72" /> <p/>
                <h1 className="mb-3 eventt-header">Please Sigin</h1>
                <label htmlFor="inputUserName" className="sr-only eventt-author">Username</label>
                <input type="email" id="inputUserName" className="form-control form-BT" placeholder="username" required />
                <label htmlFor="inputEmail" className="sr-only eventt-author">Email</label>
                <input type="email" id="inputEmail" className="form-control form-BT" placeholder="email@example.com" required />
                <label htmlFor="inputPassword" className="sr-only eventt-author">Password</label>
                <input type="password" id="inputPassword" className="form-control form-BT" placeholder="password" required />
                <button className="btn-alt btn-clear" onClick={() => navigate("/logging")}>Log in</button>
                <button className="btn-ok btn-clear" type="submit">Sigin</button>
            </form>
         </div>
    )
}

export default Logging;