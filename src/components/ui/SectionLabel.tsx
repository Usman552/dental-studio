type Props = {
  index: string;
  children: React.ReactNode;
  className?: string;
};

/** Editorial section marker, e.g. "(02) — Philosophy". */
export function SectionLabel({ index, children, className = "" }: Props) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${className}`}>
      <span className="font-serif text-[0.95rem] italic normal-case tracking-normal">({index})</span>
      <span aria-hidden className="h-px w-8 bg-current opacity-40" />
      <span>{children}</span>
    </p>
  );
}
