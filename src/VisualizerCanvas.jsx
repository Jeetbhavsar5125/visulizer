import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, SkipBack, SkipForward, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { VisualizerRegistry, parseInputForType } from './VisualizerRegistry';

const VisualizerCanvas = ({ selectedCategory, selectedAlgorithm }) => {
  const algoConfig = VisualizerRegistry[selectedCategory].algorithms[selectedAlgorithm];
  
  const [inputData, setInputData] = useState(algoConfig.defaultInput);
  const [secondInput, setSecondInput] = useState(algoConfig.secondInput || "");
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(800);

  // Update input when algorithm changes
  useEffect(() => {
    setInputData(algoConfig.defaultInput);
    setSecondInput(algoConfig.secondInput || "");
  }, [selectedAlgorithm, algoConfig.defaultInput, algoConfig.secondInput]);

  const handleRun = () => {
    const parsedData = parseInputForType(inputData, selectedCategory);
    if (parsedData.length > 0) {
      const secondVal = secondInput ? parseInt(secondInput) : undefined;
      setSteps(algoConfig.generateSteps(parsedData, secondVal));
      setCurrentStep(0);
      setIsPlaying(false);
    }
  };

  // Run automatically when algorithm changes
  useEffect(() => {
    handleRun();
  }, [selectedAlgorithm]);

  useEffect(() => {
    let timer;
    if (isPlaying && currentStep < steps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, speed);
    } else if (isPlaying && currentStep === steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps, speed]);

  const handlePlayPause = () => {
    if (currentStep === steps.length - 1) {
      setCurrentStep(0);
    }
    setIsPlaying(!isPlaying);
  };

  const currentData = steps[currentStep] || { type: 'none', array: [], nodes: [], activeIndices: [], pointers: {}, message: "" };

  return (
    <div className="panel visualizer-panel" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="panel-header" style={{ flexWrap: 'wrap' }}>
        <div className="panel-title">
          <LayoutDashboard size={16} />
          Visualization
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
           <input 
             type="text" 
             value={inputData} 
             onChange={(e) => setInputData(e.target.value)}
             placeholder="Input Data..."
             className="input-base"
             style={{ width: '200px' }}
           />
           {algoConfig.secondInputLabel && (
             <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
               <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{algoConfig.secondInputLabel}:</span>
               <input 
                 type="number" 
                 value={secondInput} 
                 onChange={(e) => setSecondInput(e.target.value)}
                 className="input-base"
                 style={{ width: '60px' }}
               />
             </div>
           )}
           <button className="btn btn-primary" onClick={handleRun}>Run</button>
        </div>
      </div>
      
      <div className="visualizer-canvas">
        
        {/* Status Message */}
        {currentData.message && (
          <div className="status-message" style={{ width: '80%' }}>
            {currentData.message}
          </div>
        )}

        {/* Generic Array / String Renderer */}
        {(currentData.type === 'array' || currentData.type === 'string') && (
          <div className="array-container">
            <AnimatePresence>
              {currentData.array.map((value, index) => {
                const isActive = (currentData.activeIndices || []).includes(index);
                const isSwapping = (currentData.swappingIndices || []).includes(index);
                const isDone = (currentData.doneIndices || []).includes(index);
                const pointerLabel = (currentData.pointers || {})[index];
                
                let className = "array-element";
                if (isActive) className += " active";
                if (isSwapping) className += " swapping";
                if (isDone) className += " done";

                return (
                  <motion.div
                    key={`${index}-${value}`}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={className}
                    style={{ height: '48px', width: '48px' }}
                  >
                    {value}
                    {pointerLabel && <div className="pointer-label">{pointerLabel}</div>}
                    <div className="array-index">{index}</div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Linked List Renderer */}
        {currentData.type === 'linkedlist' && (
          <div className="array-container" style={{ gap: '24px' }}>
            <AnimatePresence>
              {currentData.nodes.map((value, index) => {
                const nextNode = (currentData.nextPointers || [])[index];
                const pointerLabel = (currentData.pointers || {})[index];
                
                return (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="array-element"
                      style={{ height: '48px', width: '48px', borderRadius: '50%' }}
                    >
                      {value}
                      {pointerLabel && <div className="pointer-label" style={{ top: '-28px' }}>{pointerLabel}</div>}
                    </motion.div>
                    
                    {/* Render Arrow if pointing to next node */}
                    {nextNode !== undefined && nextNode !== -1 && (
                      <div style={{ color: 'var(--text-muted)' }}>→</div>
                    )}
                    {nextNode === -1 && (
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>null</div>
                    )}
                  </div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Variables Display */}
        {currentData.variables && (
          <div style={{ marginTop: '20px', display: 'flex', gap: '20px' }}>
            {Object.entries(currentData.variables).map(([key, val]) => (
              <div key={key} style={{ background: 'var(--bg-main)', padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--border-color)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>{key}:</span> <span style={{ color: 'var(--accent-primary)' }}>{val}</span>
              </div>
            ))}
          </div>
        )}

      </div>

      <div className="controls-bar" style={{ marginTop: 'auto' }}>
        <button className="btn btn-icon" onClick={() => setCurrentStep(0)} disabled={currentStep === 0}>
          <RotateCcw size={16} />
        </button>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            className="btn btn-icon" 
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0 || isPlaying}
          >
            <SkipBack size={16} />
          </button>
          
          <button className="btn btn-primary" style={{ padding: '6px 16px' }} onClick={handlePlayPause}>
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
          
          <button 
            className="btn btn-icon" 
            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
            disabled={currentStep === steps.length - 1 || isPlaying}
          >
            <SkipForward size={16} />
          </button>
        </div>
         <div className="select-wrapper">
          <select className="select-base" value={speed} onChange={(e) => setSpeed(Number(e.target.value))}>
            <option value={1500}>0.5x</option>
            <option value={800}>1x</option>
            <option value={400}>2x</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default VisualizerCanvas;
