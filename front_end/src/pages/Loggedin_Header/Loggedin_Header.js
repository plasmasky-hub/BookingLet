import './Loggedin_Header.css';
import Logo from '../../components/Header/components/Logo/Logo';
import SearchBar from '../../components/Header/components/SearchBar/SearchBar';

const Wrapper = () => {
    return (
        <div className='Wrapper'>
            <div className="Logo">
                BookingLet
            </div>
            <SearchBar />
            <div className="UserLoggedBanner">
                <div className="UserInfo">
                    <div className='UserName'>Nicolas Cage</div>
                    <div className='UserTitle'>Broker</div>
                </div>
                <div className='UserImg'></div>
            </div>
        </div>
    )
}

export default Wrapper;