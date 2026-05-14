import React from 'react';
import Editor from '@monaco-editor/react';
import { Code2 } from 'lucide-react';

const CodeEditor = ({ code, setCode, language, setLanguage, theme }) => {
  return (
    <div className="panel editor-panel">
      <div className="panel-header">
        <div className="panel-title">
          <Code2 size={16} />
          Source Code
        </div>
        <div className="select-wrapper">
          <select 
            className="select-base"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
          </select>
        </div>
      </div>
      <div style={{ flex: 1, backgroundColor: 'var(--bg-main)', padding: '8px 0' }}>
        <Editor
          height="100%"
          language={language}
          theme={theme === 'dark' ? 'vs-dark' : 'light'}
          value={code}
          onChange={(value) => setCode(value)}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: "'Fira Code', monospace",
            padding: { top: 16 },
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            cursorBlinking: "smooth",
            automaticLayout: true,
            wordWrap: "on",
            scrollbar: {
              vertical: 'visible',
              horizontal: 'visible',
              useShadows: false,
              verticalScrollbarSize: 10,
              horizontalScrollbarSize: 10
            }
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
