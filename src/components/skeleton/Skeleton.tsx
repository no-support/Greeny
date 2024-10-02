import styles from './Skeleton.module.scss';

interface SkeletonProps {
  w: number;
  h: number;
  radius?: number;
  wUnit?: 'px' | 'rem' | 'em' | '%';
  hUnit?: 'px' | 'rem' | 'em' | '%';
  rUnit?: 'px' | 'rem' | 'em' | '%';
  style?: React.CSSProperties;
}

export default function Skeleton({ w, h, radius = 0, wUnit = 'rem', hUnit = 'rem', rUnit = 'rem', style }: SkeletonProps) {
  const size: React.CSSProperties = {
    width: `${w}${wUnit}`,
    height: `${h}${hUnit}`,
    borderRadius: `${radius}${rUnit}`,
  };

  return <div className={styles.container} style={{ ...size, ...style }} />;
}
