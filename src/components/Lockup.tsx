type Props = { width: number; className?: string };

export function Lockup({ width, className }: Props) {
  return (
    <img
      className={className}
      src="/brand/lnl-lockup-dark-1200.png"
      width={width}
      height={Math.round(width * 0.2963)}
      alt="Logic & Lace"
    />
  );
}
