import styles from './Skeleton.module.scss';

interface SkeletonProps {
  w: number;
  wUnit?: 'px' | 'rem' | 'em' | '%';
  h: number;
  hUnit?: 'px' | 'rem' | 'em' | '%';
  radius?: number;
  rUnit?: 'px' | 'rem' | 'em' | '%';
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export default function Skeleton({ w, wUnit = 'rem', h, hUnit = 'rem', radius = 0, rUnit = 'rem', style, children }: SkeletonProps) {
  const size: React.CSSProperties = {
    width: `${w}${wUnit}`,
    height: `${h}${hUnit}`,
    borderRadius: `${radius}${rUnit}`,
  };

  return (
    <div className={styles.container} style={{ ...size, ...style }}>
      {children}
    </div>
  );
}
