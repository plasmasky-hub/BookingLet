import { Logo } from '../../../shared/Logo/Logo';
import SearchBar from '../components/SearchBar/SearchBar';
import UserBanner from '../components/User_Banner/User_Banner';

const Header = () => {
    return (
        <div className='Header_Wrapper'>
            <Logo>Bookinglet</Logo>
            <SearchBar />
            <UserBanner />
        </div>
    )
}

export default Header;