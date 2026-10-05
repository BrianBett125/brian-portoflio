import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Kept for backwards compatibility with existing page composition. */
  delay?: number;
  className?: string;
};

/** Server rendered reveal that adds no client JavaScript or layout movement. */
export default function Reveal({ children, className }: RevealProps) {
  return <div className={className ? `reveal-section ${className}` : "reveal-section"}>{children}</div>;
}
