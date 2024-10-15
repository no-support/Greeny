import clsx from 'clsx';
import styles from './Spinner.module.scss';
import React, { forwardRef, Ref } from 'react';

export interface SpinnerProps extends Omit<React.HTMLProps<HTMLSpanElement>, 'size'> {
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(({ size = 'xs', ...rest }, ref: Ref<HTMLSpanElement>) => {
  return <span ref={ref} className={clsx(styles.spinner, styles[size])} {...rest}></span>;
});

Spinner.displayName = 'Spinner';

export default Spinner;
