import React, { useState } from 'react';

// オプションの型を定義
interface Option {
  value: string;
  label: string;
}

const SimpleSelectBox: React.FC = () => {
  // セレクトボックスの選択肢
  const options: Option[] = [
    { value: 'apple', label: 'リンゴ' },
    { value: 'banana', label: 'バナナ' },
    { value: 'orange', label: 'オレンジ' }
  ];

  // 選択された値を管理するための状態
  const [selectedValue, setSelectedValue] = useState<string>('banana'); // 初期値は 'banana'

  // セレクトボックスの値が変更された時のハンドラ
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div>
      <select value={selectedValue} onChange={handleChange}>
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      <p>選択された値: {selectedValue}</p>
    </div>
  );
};

export default SimpleSelectBox;
