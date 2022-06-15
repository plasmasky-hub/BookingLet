import './Loggedin_Header.css';
import Logo from '../components/Logo/Logo';
import SearchBar from '../components/SearchBar/SearchBar';
import ClickAway from '../../Header/components/UserInfo/UserInfo';

export const Wrapper = () => {
    return (
        <div className='Wrapper'>
            <Logo />
            <SearchBar />
            <ClickAway />
        </div>
    )
}