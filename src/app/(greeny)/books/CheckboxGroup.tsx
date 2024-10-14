import styles from './CheckboxGroup.module.scss';

export default function CheckboxGroup({ groupNm, title, options }: CheckboxGroupProps) {
  return (
    <div className={styles.question_section}>
      <p className={styles.question_title}>{title}</p>
      <div className={styles.label_wrapper}>
        {options.map(({ code, label }) => (
          <label key={code} className={styles.custom_checkbox}>
            <input type="checkbox" name={groupNm} value={code} />
            <span>{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

interface CheckboxOption {
  code: string;
  label: string;
}

interface CheckboxGroupProps {
  groupNm: string;
  title: string;
  options: CheckboxOption[];
}
