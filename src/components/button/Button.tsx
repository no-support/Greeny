import styles from './Button.module.scss';
import clsx from 'clsx';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  bgColor?: 'fill' | 'line';
  btnSize?: 'xs' | 'sm' | 'md' | 'lg';
  radiusStyle?: 'round' | 'curve';
}

const Button: React.FC<ButtonProps> = ({ type = 'button', btnSize = 'lg', bgColor = 'fill', radiusStyle = 'curve', ...rest }) => {
  const bgColors = styles[bgColor];
  const btnSizes = styles[btnSize];
  const btnRadius = styles[radiusStyle];

  const { className, children, ...restProps } = rest;
  const classNames = className?.split(' ').map((item) => styles[item]);
  return (
    <button className={clsx(styles.button, bgColors, btnSizes, btnRadius, classNames)} type={type} {...restProps}>
      {children}
    </button>
  );
};

export default Button;
