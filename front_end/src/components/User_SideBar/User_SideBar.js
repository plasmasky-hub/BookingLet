import './User_SideBar.css';
import { UserImg, UserName } from '../Header/components/UserInfo/UserInfo';

export const User_SideBar = () => {
    return(
        <div className="user_sidebar_wrapper">
            <div className='user_profile_header'>
                <UserImg />
                <UserName />
            </div>
        </div>
    )
}