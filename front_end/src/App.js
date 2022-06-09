import './App.css';
import HeaderWrapper from './components/Header';

const SearchBar = () => {
  return (
    <div>SearchBar</div>
  )
}

const Login = () => {
  return (
    <div>Login</div>
  )
}

const RegisterBtn = () => {
  return (
    <div>Register</div>
  )
}


const App = () => {
  return (
    <div>
      <HeaderWrapper />
      <SearchBar />
      <Login />
      <RegisterBtn />
    </div>
    
  )
}

export default App;
