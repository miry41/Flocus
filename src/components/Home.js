import LeftPanel from './LeftPanel'
import MainPanel from './MainPanel'
import RightPanel from './RightPanel'
import Header from './Header'

function Home() {
  return (
    <div className="topContainer">
      <Header />
      <div className="home">
        <LeftPanel />
        <MainPanel />
        <RightPanel />
      </div>
    </div>
  )
}

export default Home