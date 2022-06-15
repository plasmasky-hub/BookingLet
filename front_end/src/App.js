import Banner from "./components/HomePage-banner/index";
import Highlights from "./components/filter/index";
import Register from "./components/Register";
import Footer from "./components/Footer";
import ClickAway from './components/Header/components/UserInfo/UserInfo';
import { Wrapper } from "./components/Header/Loggedin_Header/Loggedin_Header";

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