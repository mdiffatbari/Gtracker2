import React from 'react';
import Banner from '../../components/Banner/Banner';
import { Helmet } from 'react-helmet';
import HomeSections from '../../components/HomeSections/HomeSections';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home | Btracker</title>
            </Helmet>
           <Banner></Banner>
           <HomeSections></HomeSections>
        </div>
    );
};

export default Home;