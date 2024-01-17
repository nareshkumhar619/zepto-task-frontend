// App.tsx
import React from 'react';
import ChipComponent from './Component/Chip';
import "./App.css"
const App: React.FC = () => {
  const allItems: string[] = ["Naresh Kumhar","AlmaBetter","Reacher","Money heist","Stranger things","Virat Kohli", "Rohit Sharma", "John Doe", "Jane Smith", "Bob Johnson", "Nick Giannopoulos"];

  return (
    <div className="App">
      <ChipComponent allItems={allItems} />
    </div>
  );
}

export default App;
