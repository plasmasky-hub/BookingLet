import { Header } from './components/UI/Header';
import Banner from './components/UI/HomePage-banner/index'
import { UserBanner } from './components/UI/UserData';
import { SelectedListItem } from "./components/UI/UserSideBar";

function App() {
  return (
    <div>
      <Header />
      <SelectedListItem />
      <Banner />
    </div>
  );
}

export default App;