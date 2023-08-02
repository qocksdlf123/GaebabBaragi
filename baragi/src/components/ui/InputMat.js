import React, { useState } from 'react';

function InputMat({ step, matName, matAmount, ingredientsChange }) {
  const handleMatnameChange = (e) => {
    const newMatName = e.target.value;
    ingredientsChange(step, 'name', newMatName);
  };

  const handleMatamountChange = (e) => {
    const newMatAmount = e.target.value;
    ingredientsChange(step, 'amount', newMatAmount);
  };

  return (
    <>
      <div style={{ width: '120%', borderRadius: '5px', backgroundColor: '#FFEACB', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ margin: '5% 0% 5% 5%' }}>
          <input
            type="text"
            id={`Matname${step}`}
            name={`Matname${step}`}
            value={matName}
            onChange={handleMatnameChange}
            placeholder="재료를 입력하세요"
            style={{ textAlign: 'center' }}
          />
        </div>
        <div style={{ margin: '5% 5% 5% 5%' }}>
          <input
            type="text"
            id={`matAmount${step}`}
            name={`matAmount${step}`}
            value={matAmount}
            onChange={handleMatamountChange}
            placeholder="양을 입력하세요"
            style={{ textAlign: 'center' }}
          />
        </div>
      </div>
    </>
  );
}

export default InputMat;
