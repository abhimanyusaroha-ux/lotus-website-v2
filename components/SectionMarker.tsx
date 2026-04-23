export function SectionMarker({ label }: { label: string }) {
  return (
    <span className="caption font-sans text-gray-600 uppercase tracking-[0.06em]">
      {label}
    </span>
  );
}
