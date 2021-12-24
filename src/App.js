import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TrendingFeed from './components/TrendingFeed/TrendingFeed';
import Profile from './components/Profile/Profile';
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/tiktuk" exact element={<TrendingFeed />} />
          <Route path="/tiktuk/:nickname" exact element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
