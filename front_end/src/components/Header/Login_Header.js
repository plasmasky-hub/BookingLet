import './Header.css';
import SearchIcon from '@mui/icons-material/Search';

const HeaderWrapper = () => {
    return (
        <div class="Header_Wrapper">
        <div class="Logo">
            BookingLet
        </div>
        <div class="SearchBar">
            <div class="SearchIcon"></div>
        </div>
        <div class="UserBanner_Wrapper">
            <div class="User_Login">
                <div class="LoginIcon"></div>
                Login
            </div>
            <div class="UserRegister">
                Register
            </div>
        </div>
    </div>
    )
  }

  export default HeaderWrapper;