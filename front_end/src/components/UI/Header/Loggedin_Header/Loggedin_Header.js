import styled from "styled-components";
import { Logo } from '../../../shared/Logo/Logo';
import SearchBar from '../components/SearchBar/SearchBar';
import ClickAway from '../components/UserInfo/UserInfo';

export const Wrapper = () => {
    return (
        <div>
            <Logo />
            <ClickAway />
        </div>
    )
}