/** Editierbare Feld-Zeile: Label links, Input rechts (rechtsbuendig). */
export default function EditableField({
  label,
  value,
  onChange,
  uncertain,
  numeric,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  uncertain?: boolean;
  numeric?: boolean;
}) {
  return (
    <div className="efield">
      <span className="efield__label">{label}</span>
      <input
        className={uncertain ? "is-uncertain" : ""}
        value={value}
        inputMode={numeric ? "decimal" : undefined}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
