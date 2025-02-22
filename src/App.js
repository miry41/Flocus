import './App.css';
import SignIn from './components/gears/SignIn';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Home from './components/Home';

function App() {
  const [user] = useAuthState(auth);
  return  <div>
    {// ログイン状態ならHomeコンポーネントを表示。Homeコンポーネントにすべて配置
    // ログイン状態でない場合は別のコンポーネントを表示する予定
    // その中にSignInコンポーネントを表示
  }
    {user ? <Home /> : <SignIn />}
  </div>;
}

export default App;
