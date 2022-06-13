import './Login_Header.css';
import Logo from '../../components/Header/components/Logo/Logo';
import SearchBar from '../../components/Header/components/SearchBar/SearchBar';
import UserBanner from '../../components/Header/components/User_Banner/User_Banner';

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