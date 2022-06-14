import Banner from './components/HomePage-banner/index';
import Highlights from './components/filter/index';
import Register from './components/Register';
import Footer from './components/Footer';
import StoreDisplay from './components/HomePage_StoreDisplay/StoreDisplay';
import Header from './pages/Login_Header/Login_Header';

function App() {
  return (
    <div>
      <div>
        <Header />
        <Banner />
        <StoreDisplay />
        <Register />
        <Footer />
      </div>
    </div>
  );
}

export default App;
