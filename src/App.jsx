// import package components
import { Routes, Route } from 'react-router-dom';
// import components
import { AppState } from './context/AppState';
import { OptionState } from './context/OptionState';
import Homepage from "./pages/Homepage";
import Playerpage from './pages/Playerpage';
import Searchpage from './pages/Searchpage';

const App = () => {
  return (
    <AppState>  {/* global data for app */}
      <OptionState> {/* though it used in homepage only, but navbar component in other page, so it has to be make global */}
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/song' element={<Playerpage />} />
          <Route path='/search' element={<Searchpage />} />
        </Routes>
      </OptionState>
    </AppState>
  );
}

export default App;
