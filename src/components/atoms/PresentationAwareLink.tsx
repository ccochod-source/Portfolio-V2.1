import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import { resolvePresentationHref } from '@/lib/canvaEmbed';

type Props = {
  href: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

/** Les présentations Canva renvoient vers `/presentations/embed` sur ce site ; les autres URLs gardent le comportement habituel. */
export function PresentationAwareLink({ href, className = '', style, children }: Props) {
  const { internalEmbed, href: dest } = resolvePresentationHref(href);
  if (internalEmbed) {
    return (
      <Link href={dest} className={className} style={style}>
        {children}
      </Link>
    );
  }
  const isHttp = /^https?:\/\//i.test(href);
  return (
    <a
      href={href}
      className={className}
      style={style}
      {...(isHttp ? { target: '_blank' as const, rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  );
}
