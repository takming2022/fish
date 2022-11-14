import './App.css';
import { useEffect, useState } from 'react';
import Login from './login';
import Basefish from './basefish';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Guess from './guess';
import Demofish from './demofish';
import Linkstart from './linkstart';
import History from './history';
function App() {
  const [countall, setCountall] = useState([])
  const [log, setLog] = useState()
  const [demofishtorf, setDemofishtorf] = useState(false)
  const [historytorf , setHistorytorf] = useState(false)
  return (
    <div className="App">
      {/* <Test /> */}
      <Router>
        <Routes>
          <Route exact path="/" element={<Linkstart setDemofishtorf={setDemofishtorf} setHistorytorf={setHistorytorf}/>} />
          <Route exact path="/login" element={<Login setlogdata={setLog} setDemofishtorf={setDemofishtorf} />} />
          <Route exact path="/guess" element={<Guess setCountalll={setCountall} setDemofishtorf={setDemofishtorf} />} />
          <Route exact path="/basefish" element={<Basefish countal={countall} setDemofishtorf={setDemofishtorf} setCountalll={setCountall} />} />
        </Routes>
      </Router>
      {historytorf && <History setHistorytorf={setHistorytorf}/>}
      {demofishtorf && <Demofish />}
      
    </div>
  );
}

export default App;
