import './App.css';
import './pages/Loggedin_Header/Loggedin_Header.css';
import Header from './pages/Login_Header/Login_Header';
import Wrapper from './pages/Loggedin_Header/Loggedin_Header';
import { User_SideBar } from './components/User_SideBar/User_SideBar';

const App = () => {
  return (
    <div className='UserLoggedin_Banner'>
      <Header />
      {/* <Wrapper /> */}
      <User_SideBar />
    </div>
  )
}

export default App;
