import { type ComponentPropsWithoutRef, forwardRef } from 'react';
import styles from './Input.module.scss';

type InputProps = ComponentPropsWithoutRef<'input'>;

const Input = forwardRef<HTMLInputElement, InputProps>(({ type = 'text', ...rest }, ref) => {
  return <input className={styles.input} type={type} ref={ref} {...rest} />;
});

Input.displayName = 'Input';

export default Input;
