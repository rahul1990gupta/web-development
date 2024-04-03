import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AboutMe from './AboutMe';
import Portfolio from './Portfolio';
import Contact from './Contact';

function App() {
  return (
    <Router>
      <div>
        <header>
          <nav>
            <ul>
              <li><Link to="/about-me">About Me</Link></li>
              <li><Link to="/portfolio">Portfolio</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </nav>
        </header>
        <Routes>
          <Route path="/about-me" element={<AboutMe />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;