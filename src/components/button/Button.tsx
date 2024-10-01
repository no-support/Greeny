import styles from './Button.module.scss';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  bgColor?: 'fill' | 'line';
  btnSize?: 'xs' | 'sm' | 'md' | 'lg';
  radiusStyle?: 'round' | 'curve';
}

const Button: React.FC<ButtonProps> = ({ children, type = 'button', btnSize = 'lg', bgColor = 'fill', radiusStyle = 'curve', ...rest }) => {
  const bgColors = styles[bgColor];
  const btnSizes = styles[btnSize];
  const btnRadius = styles[radiusStyle];

  return (
    <button className={`${bgColors} ${btnSizes} ${btnRadius} ${styles.button}`} type={type} {...rest}>
      {children}
    </button>
  );
};

export default Button;
