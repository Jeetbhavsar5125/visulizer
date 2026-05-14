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
      <div style={{ height: 'calc(100% - 45px)', backgroundColor: 'var(--bg-main)', padding: '8px 0' }}>
        <Editor
          height="100%"
          language={language}
          theme={theme === 'dark' ? 'vs-dark' : 'vs'}
          value={code}
          loading={<div style={{ color: 'var(--text-muted)', padding: '20px', textAlign: 'center' }}>Loading Source Code...</div>}
          onChange={(value) => setCode(value)}
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            fontFamily: "'JetBrains Mono', monospace",
            padding: { top: 16 },
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            automaticLayout: true,
            scrollbar: {
              vertical: 'visible',
              horizontal: 'visible',
              verticalScrollbarSize: 8,
              horizontalScrollbarSize: 8,
              useShadows: false,
            },
            contextmenu: false,
            readOnly: false,
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
