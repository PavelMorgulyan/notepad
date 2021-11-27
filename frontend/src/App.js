
import {
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


import './App.css';
import Headers from './components/Headers';
import NotesListPage from './pages/NotesListPage';
import NotePage from "./pages/NotePage";

function App() {
  return (
    <div className="container dark">
    <div className="app">
    <Router>
        <Headers />
        <Routes>
            <Route path="/" exact element={<NotesListPage />} />
            <Route path="/note/:id" element={<NotePage />} />
        </Routes>
      </Router>
    </div>
    </div>
  );
}

export default App;
