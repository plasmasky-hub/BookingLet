import { Header } from './components/UI/Header/Header';
import Banner from './components/UI/HomePage-banner/index'
import { UserBanner } from './components/UI/Header/UserData';
import { SelectedListItem } from "./components/UI/Header/UserSideBar";

function App() {
  return (
    <div>
      <Header />
      {/* <SelectedListItem /> */}
      <Banner />
    </div>
  );
}

export default App;