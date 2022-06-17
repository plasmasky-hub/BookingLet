import * as React from 'react';
import { theme } from "../../../theme";
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { User_SideBar } from '../../../User_SideBar/User_SideBar';
import ClickAwayListener from '@mui/material/ClickAwayListener';

export default function ClickAway() {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    const handleClickAway = () => {
        setOpen(false);
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div className="UserLoggedInBanner">
                <div className="UserInfo">
                    <div className='UserName'>Nicolas Cage</div>
                    <div className='UserTitle'>Broker</div>
                </div>
                <div className='UserImg' onClick={handleClick}>
                    {open ? (
                        <User_SideBar />
                    ) : null}
                </div>
            </div>
        </ClickAwayListener>
    );
}
