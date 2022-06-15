import './Login_Header.css';
import Logo from '../components/Logo/Logo';
import SearchBar from '../components/SearchBar/SearchBar';
import UserBanner from '../components/User_Banner/User_Banner';

const Header = () => {
    return (
        <div className='Header_Wrapper'>
            <Logo />
            <SearchBar />
            <UserBanner />
        </div>
    )
}

export default Header;