export function LaceDivider({ className }: { className?: string }) {
  return <div className={className ? `lace ${className}` : "lace"} aria-hidden="true" />;
}
