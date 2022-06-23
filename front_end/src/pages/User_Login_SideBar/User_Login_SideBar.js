import { Wrapper } from '../Loggedin_Header/Loggedin_Header';
import { User_SideBar } from '../../components/User_SideBar/User_SideBar';

export const showSideBar = () => {
    return (
        <div>
            <Wrapper />
            <User_SideBar />
        </div>
    )
}