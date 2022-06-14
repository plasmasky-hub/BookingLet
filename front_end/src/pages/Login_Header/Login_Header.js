import './Login_Header.css';
import Logo from '../../components/Header/components/Logo/Logo';
import UserBanner from '../../components/Header/components/User_Banner/User_Banner';

const Header = () => {
    return (
        <div className='Header_Wrapper'>
            <Logo />
            <UserBanner />
        </div>
    )
}

export default Header;