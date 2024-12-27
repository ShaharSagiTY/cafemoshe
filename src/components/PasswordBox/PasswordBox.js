import React, { useRef, useEffect } from 'react';

function PasswordBox({mypassword,handlePassChange,handlePasswordCheck}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
        <div id='passwordBox'>
            <p>הקלד סיסמא</p>
            <input
                type='password'
                value={mypassword}
                ref={inputRef}
                onChange={e => handlePassChange(e.target.value)}
            />
            <br></br>
            <button onClick={handlePasswordCheck}>פתח</button>
        </div>
  );
}

export default PasswordBox;