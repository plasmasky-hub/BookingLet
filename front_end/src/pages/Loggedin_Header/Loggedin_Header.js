import './Loggedin_Header.css';
import Logo from '../../components/Header/components/Logo/Logo';
import SearchBar from '../../components/Header/components/SearchBar/SearchBar';
import { UserInfo } from '../../components/Header/components/UserInfo/UserInfo';

export const Wrapper = () => {
    return (
        <div className='Wrapper'>
            <Logo />
            <SearchBar />
            <UserInfo />
        </div>
    )
}