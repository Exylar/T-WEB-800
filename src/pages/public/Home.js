import React from 'react';

import Header from './partials/Header';
import HeroHome from './partials/HeroHome';
import FeaturesBlocks from './partials/FeaturesBlocks';
import Footer from './partials/Footer';

const Home =() => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      <Header />
      {/*  Page content */}
      <main className="flex-grow">
        {/*  Page sections */}
        <HeroHome />
        <FeaturesBlocks />
      </main>
      {/*  Site footer */}
      <Footer />
    </div>
  );
}

export default Home;