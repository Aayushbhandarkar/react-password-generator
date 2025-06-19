import { useState, useCallback, useEffect, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";

function App() {
  const [length, setLength] = useState(17);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(true);
  const [password, setPassword] = useState("eNwuJq#Mc`$a^Cu");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += " !@#$%^&*()_+[]{}|;:,.<>?";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 777);
    window.navigator.clipboard.writeText(password);
    toast.success("Password copied!");
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#111827',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      fontFamily: 'sans-serif'
    }}>
      <Toaster position="top-center" />

      <div style={{
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '0.5rem',
        width: '100%',
        maxWidth: '24rem',
        border: '1px solid #e5e7eb'
      }}>
        <h1 style={{
          textAlign: 'center',
          fontSize: '1.25rem',
          fontWeight: 'normal',
          marginBottom: '1.5rem',
          color: '#1f2937'
        }}>
          Password generator
        </h1>

        <div style={{
          display: 'flex',
          borderRadius: '0.25rem',
          overflow: 'hidden',
          marginBottom: '1.5rem',
          border: '1px solid #d1d5db'
        }}>
          <input
            type="text"
            value={password}
            style={{
              flexGrow: 1,
              padding: '0.5rem 0.75rem',
              color: '#1f2937',
              fontSize: '0.875rem',
              backgroundColor: 'white',
              outline: 'none',
              fontFamily: 'monospace',
              border: 'none'
            }}
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              padding: '0.5rem 0.75rem',
              fontSize: '0.875rem',
              fontWeight: 'normal',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Copy
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ color: '#374151' }}>Length: {length}</span>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              style={{
                width: '8rem',
                height: '0.25rem',
                accentColor: '#3b82f6',
                backgroundColor: '#e5e7eb',
                borderRadius: '9999px'
              }}
              onChange={(e) => setLength(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ color: '#374151' }}>Numbers</span>
            <input
              type="checkbox"
              checked={numberAllowed}
              style={{
                width: '1rem',
                height: '1rem',
                accentColor: '#3b82f6',
                borderRadius: '0.25rem',
                borderColor: '#d1d5db'
              }}
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ color: '#374151' }}>Characters</span>
            <input
              type="checkbox"
              checked={charAllowed}
              style={{
                width: '1rem',
                height: '1rem',
                accentColor: '#3b82f6',
                borderRadius: '0.25rem',
                borderColor: '#d1d5db'
              }}
              onChange={() => setCharAllowed((prev) => !prev)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;