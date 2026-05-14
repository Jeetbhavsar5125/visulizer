import React from 'react';
import Editor from '@monaco-editor/react';
import { Code2 } from 'lucide-react';

const CodeEditor = ({ code, setCode, language, setLanguage, theme }) => {
  return (
    <div className="panel editor-panel">
      {/* Header */}
      <div
        className="panel-header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'wrap',
        }}
      >
        <div
          className="panel-title"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: '600',
          }}
        >
          <Code2 size={16} />
          Source Code
        </div>

        <div className="select-wrapper">
          <select
            className="select-base"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-panel)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              minWidth: '120px',
            }}
          >
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
          </select>
        </div>
      </div>

      {/* Editor Container */}
      <div
        style={{
          width: '100%',
          height: '450px',
          minHeight: '300px',
          maxHeight: '80vh',
          backgroundColor: 'var(--bg-panel)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          overflow: 'hidden',
          marginTop: '12px',

          /* Mobile + Touch Fixes */
          touchAction: 'pan-x pan-y',
          WebkitOverflowScrolling: 'touch',

          /* Prevent layout breaking */
          position: 'relative',
        }}
      >
        <Editor
          height="100%"
          width="100%"
          language={language}
          theme={theme === 'dark' ? 'vs-dark' : 'vs'}
          value={code}
          onChange={(value) => setCode(value || '')}
          loading={
            <div
              style={{
                color: 'var(--text-muted)',
                padding: '20px',
                textAlign: 'center',
              }}
            >
              Loading Source Code...
            </div>
          }
          options={{
            /* Core */
            readOnly: false,
            domReadOnly: false,
            automaticLayout: true,

            /* UI */
            minimap: { enabled: false },
            fontSize: window.innerWidth < 768 ? 12 : 14,
            lineHeight: 22,
            fontFamily: "'JetBrains Mono', monospace",
            padding: { top: 16, bottom: 16 },

            /* Scrolling */
            smoothScrolling: true,
            scrollBeyondLastLine: false,
            mouseWheelZoom: true,

            scrollbar: {
              vertical: 'visible',
              horizontal: 'visible',
              verticalScrollbarSize: 10,
              horizontalScrollbarSize: 10,
              alwaysConsumeMouseWheel: false,
              useShadows: false,
            },

            /* Mobile Improvements */
            wordWrap: 'on',
            wrappingStrategy: 'advanced',
            overviewRulerLanes: 0,
            fixedOverflowWidgets: true,

            /* Cursor */
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',

            /* Suggestions */
            quickSuggestions: true,
            suggestOnTriggerCharacters: true,

            /* Misc */
            contextmenu: true,
            renderLineHighlight: 'line',
            roundedSelection: true,
            selectOnLineNumbers: true,

            /* Better Touch Experience */
            multiCursorModifier: 'ctrlCmd',
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;