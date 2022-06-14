import React from "react";
import './User_Banner.css';
import LoginIcon from '@mui/icons-material/Login';

const UserBanner = () => {
    return (
        <div className="UserBanner_Wrapper">
            <div className="User_Login">
                <div className="LoginIcon">
                    <LoginIcon />
                </div>
                <div className="Login">Log in</div>
            </div>
            <div className="UserRegister">Register</div>
        </div>
    )
}

export default UserBanner;