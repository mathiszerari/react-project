import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chat from './pages/ChatPage';
import Home from './pages/HomePage';
import Friend from './pages/FriendPage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          // si l'utilisateur est connecté ce routeur sinon un souteur avec uniquement signup et login
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/friends" element={<Friend />} />
          
          {/* Catch-all route for undefined paths */}
          <Route path="*" element={<Chat />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
