import { type ComponentPropsWithoutRef, forwardRef } from 'react';
import styles from './Input.module.scss';
import { clsx } from 'clsx';
type InputProps = ComponentPropsWithoutRef<'input'>;

const Input = forwardRef<HTMLInputElement, InputProps>(({ type = 'text', className, ...rest }, ref) => {
  return <input className={clsx(className, styles.input)} type={type} ref={ref} {...rest} />;
});

Input.displayName = 'Input';

export default Input;
