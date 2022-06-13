import './UserInfo.css';

export const UserImg = () => {
    return (
        <div className='UserImg'></div>
    )
}

export const UserName = () => {
    return(
        <div className='UserName'>Nicolas Cage</div>
    )
}

export const UserInfo = () => {
    return (
        <div className="UserLoggedBanner">
            <div className="UserInfo">
                {UserName()}
                <div className='UserTitle'>Broker</div>
            </div>
            {UserImg()}
        </div>
    )
}