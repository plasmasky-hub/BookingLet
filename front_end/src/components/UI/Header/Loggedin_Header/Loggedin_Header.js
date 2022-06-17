import './Loggedin_Header.css';
import { Logo } from '../../../shared/Logo/Logo';
import SearchBar from '../components/SearchBar/SearchBar';
import ClickAway from '../components/UserInfo/UserInfo';

export const Wrapper = () => {
    return (
        <div className='Wrapper'>
            <Logo />
            <SearchBar />
            <ClickAway />
        </div>
    )
}