import React, { useState, useEffect } from 'react';
import CodeEditor from './CodeEditor';
import VisualizerCanvas from './VisualizerCanvas';
import { Layers, Sun, Moon } from 'lucide-react';
import { VisualizerRegistry } from './VisualizerRegistry';
import './index.css';

function App() {
  const categories = Object.keys(VisualizerRegistry);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  
  const algorithms = Object.keys(VisualizerRegistry[selectedCategory].algorithms);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(algorithms[0]);

  const [code, setCode] = useState(VisualizerRegistry[selectedCategory].algorithms[selectedAlgorithm].defaultCode);
  const [language, setLanguage] = useState('java');
  const [theme, setTheme] = useState('dark');

  // Update theme class on document body
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  // Update code when algorithm changes
  useEffect(() => {
    const defaultCode = VisualizerRegistry[selectedCategory].algorithms[selectedAlgorithm].defaultCode;
    if (defaultCode) {
      setCode(defaultCode);
    }
  }, [selectedAlgorithm, selectedCategory]);

  const handleCategoryChange = (e) => {
    const newCat = e.target.value;
    setSelectedCategory(newCat);
    setSelectedAlgorithm(Object.keys(VisualizerRegistry[newCat].algorithms)[0]);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <header className="app-header">
        <div className="app-header-brand">
          <Layers size={18} />
          DSA AlgoViz
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div className="select-wrapper">
            <select 
              className="select-base"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{VisualizerRegistry[cat].name}</option>
              ))}
            </select>
          </div>
          <div className="select-wrapper">
            <select 
              className="select-base"
              value={selectedAlgorithm}
              onChange={(e) => setSelectedAlgorithm(e.target.value)}
            >
              {Object.entries(VisualizerRegistry[selectedCategory].algorithms).map(([key, algo]) => (
                <option key={key} value={key}>{algo.name}</option>
              ))}
            </select>
          </div>
          
          {/* Theme Toggle Button */}
          <button 
            className="btn btn-icon" 
            onClick={toggleTheme}
            style={{ marginLeft: '8px' }}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </header>
      
      <main className="app-content">
        <CodeEditor 
          code={code} 
          setCode={setCode} 
          language={language} 
          setLanguage={setLanguage} 
          theme={theme}
        />
        <VisualizerCanvas 
          selectedCategory={selectedCategory}
          selectedAlgorithm={selectedAlgorithm}
        />
      </main>
    </>
  );
}

export default App;
