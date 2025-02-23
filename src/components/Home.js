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
      <div className="row flex-grow-1 home">
        <div className="col-12 col-md-6 order-1 order-md-2 p-0">
          <MainPanel />
        </div>
        <div className="col-6 col-md-3 order-2 order-md-1 p-0">
          <LeftPanel />
        </div>
        <div className="col-6 col-md-3 order-3 order-md-3 p-0">
          <RightPanel />
        </div>
      </div>
    </div>
  );
}

export default Home;