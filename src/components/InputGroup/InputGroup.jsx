import React, { useState } from 'react';

import './InputGroup.css';

const InputGroup = ({ label, type, value, onChange }) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="input-group">
      <label className={`label ${focused ? 'focused' : ''}`}>{label}</label>
      <input
        type={type}
        className="input"
        value={value}
        onFocus={() => setFocused(true)}
        onChange={onChange}
        onBlur={(e) => setFocused(e.target.value !== '')}
      />
    </div>
  );
};

export default InputGroup;