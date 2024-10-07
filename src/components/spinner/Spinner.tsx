import clsx from 'clsx';
import styles from './Spinner.module.scss';

export interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

const Spinner = ({ size = 'xs' }: SpinnerProps) => {
  return <span className={clsx(styles.spinner, styles[size])}></span>;
};
export default Spinner;
