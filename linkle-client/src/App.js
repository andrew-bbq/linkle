import './App.css';
import Index from './components/Index'
import Linked from './components/Linked'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/linkypoo" element={<Linked />} />
      </Routes>
    </Router>
  );
}

export default App;
