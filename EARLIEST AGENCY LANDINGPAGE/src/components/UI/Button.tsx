import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import styles from './Button.module.css';

type Variant = 'primary' | 'ghost';

interface BaseProps {
  variant?: Variant;
  full?: boolean;
  shimmer?: boolean;
  children: ReactNode;
}

type BtnProps = BaseProps &
  ({ href: string } & AnchorHTMLAttributes<HTMLAnchorElement>) |
  (BaseProps & ButtonHTMLAttributes<HTMLButtonElement>);

export default function Button(props: BtnProps) {
  const { variant = 'primary', full, shimmer, children, ...rest } = props;

  const cls = [
    styles.btn,
    styles[variant],
    full ? styles.full : '',
    shimmer ? styles.shimmer : '',
    'hover-trigger',
  ]
    .filter(Boolean)
    .join(' ');

  if ('href' in rest && rest.href) {
    return (
      <a className={cls} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
