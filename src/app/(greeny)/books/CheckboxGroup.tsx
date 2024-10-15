'use client';
import { useState } from 'react';
import styles from './CheckboxGroup.module.scss';

interface CheckboxOption {
  code: string;
  label: string;
}

interface CheckboxGroupProps {
  groupNm: string;
  title: string;
  options: CheckboxOption[];
  initCode: string[];
}

export default function CheckboxGroup({ groupNm, title, options, initCode }: CheckboxGroupProps) {
  const [checkedItems, setCheckedItems] = useState(initCode);

  const handleCheckboxChange = (code: string) => {
    setCheckedItems(
      (prev) =>
        prev.includes(code)
          ? prev.filter((item) => item !== code) // Uncheck if already checked
          : [...prev, code], // Check if not checked
    );
  };

  return (
    <div className={styles.question_section}>
      <p className={styles.question_title}>{title}</p>
      <div className={styles.label_wrapper}>
        {options.map(({ code, label }) => (
          <label key={code} className={styles.custom_checkbox}>
            <input type="checkbox" name={groupNm} value={code} checked={checkedItems.includes(code)} onChange={() => handleCheckboxChange(code)} />
            <span>{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
