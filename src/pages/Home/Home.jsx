import React from 'react';
import Banner from '../../components/Banner/Banner';
import { Helmet } from 'react-helmet';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home | Btracker</title>
            </Helmet>
           <Banner></Banner>
        </div>
    );
};

export default Home;