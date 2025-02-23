import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LeftPanel from './LeftPanel';
import MainPanel from './MainPanel';
import RightPanel from './RightPanel';
import Header from './Header';

function Home() {
  return (
    <div className="container-fluid d-flex flex-column vh-100">
      <Header />
      <div className="row flex-grow-1">
        <div className="col-lg-3 col-md-4 col-sm-12 p-0">
          <LeftPanel />
        </div>
        <div className="col-lg-6 col-md-8 col-sm-12 p-0">
          <MainPanel />
        </div>
        <div className="col-lg-3 d-none d-lg-block p-0">
          <RightPanel />
        </div>
      </div>
    </div>
  );
}

export default Home;