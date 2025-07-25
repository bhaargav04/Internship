import './App.css';

import Home from './Components/Home.jsx';
import About from './Components/About.jsx';
import Courses from './Components/Courses.jsx';
import Blog from './Components/Blog.jsx';
import Instructor from './Components/Instructor.jsx';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/courses' element={<Courses />} />
        <Route path='/instructor' element={<Instructor/>} />
        <Route path='/blog' element={<Blog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
