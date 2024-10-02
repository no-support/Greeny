import styles from './Skeleton.module.scss';

interface SkeletonProps {
  w: number;
  h: number;
  radius?: number;
  style?: React.CSSProperties;
}

export default function Skeleton({ w, h, radius = 0, style }: SkeletonProps) {
  const size: React.CSSProperties = {
    width: `${w}rem`,
    height: `${h}rem`,
    borderRadius: `${radius}rem`,
  };

  return <div className={styles.container} style={{ ...size, ...style }} />;
}
