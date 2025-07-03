import { useState } from 'react';
import './App.css';

function App() {
  const [list, setList] = useState([]);
  const [input, setInput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleAdd = () => {  
      setList([...list, input]);
      setInput('');
  };

  return (
    < >
    <div id='whole'>
      <h1>TO-DO LIST</h1>
      <div>
        <input type="text" value={input} onChange={handleInputChange}/>
        <button onClick={handleAdd}>Add</button>
      </div>

      <ul>
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      </div>
    </>
  );
}

export default App;
