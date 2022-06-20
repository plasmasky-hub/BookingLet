import Banner from "./components/UI/HomePage-banner/index";
import Highlights from "./components/UI/filter/index";
import Register from "./components/UI/Register";
import Footer from "./components/UI/Footer";
import ClickAway from './components/UI/Header/components/UserInfo/UserInfo';
import { Wrapper } from "./components/UI/Header/Loggedin_Header/Loggedin_Header";
import { User_SideBar } from "./components/UI/User_SideBar/User_SideBar";
import Header from './components/UI/Header/Login_Header/Login_Header';


function App() {
  return (
    <div>
      <div>
        <Wrapper />
        <Banner />
        {/* <Register/>
        <Footer/> */}

      </div>
    </div>
  );
}

export default App;