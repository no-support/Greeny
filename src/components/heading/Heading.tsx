import styles from './Heading.module.scss';
import React, { forwardRef } from 'react';

type HeadingProps<T extends 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'> = {
  as?: T;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<T>;

const Heading = forwardRef<HTMLHeadingElement, HeadingProps<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>>(function Heading({ as, children, ...props }, ref) {
  const Component = as || 'h1';
  const className = styles[as as keyof typeof styles];
  return React.createElement(Component, { ref, className, ...props }, children);
});

Heading.displayName = 'Heading';
export default Heading;
