
import React from 'react';
import { Header } from '../../components/shared/Header/Header';
import Layout from "../../components/shared/Layout";
import Footer from '../../components/shared/Footer';
import TopBanner from './components/TopBanner/TopBanner';
import TeamList from './components/TeamList';

const TeamPage = () => (
      <div>
        {/* <Header /> */}
        <TopBanner />
        <TeamList /> 
      </div>
    );
  
  export default TeamPage;
  