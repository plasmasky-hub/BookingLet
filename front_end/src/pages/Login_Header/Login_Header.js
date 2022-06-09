import './Login_Header.css';
import Logo from '../../components/Header/components/Logo/Logo';
import SearchBar from '../../components/Header/components/SearchBar/SearchBar';
import UserBanner from '../../components/Header/components/User_Banner/User_Banner';
import LoginIcon from '@mui/icons-material/Login';

const Header = () => {
    return (
        <div className="Header_Wrapper">
            <div className="Logo">
                BookingLet
            </div>
            <SearchBar />
            <div className="UserBanner_Wrapper">
                <div className="User_Login">
                    <div className="LoginIcon">
                        <LoginIcon />
                    </div>
                    <div className="Login">Login</div>
                </div>
                <button className="UserRegister">
                    Register
                </button>
            </div>
        </div>
        // <div className='Header_Wrapper'>
        //     <Logo />
        //     <SearchBar />
        //     <UserBanner />
        // </div>
    )
}

export default Header;