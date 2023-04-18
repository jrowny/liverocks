interface NumberInputProps {
  value: number;
  name: string;
  label: string;
  min: number;
  max: number;
  setValue: (value: number) => void;
}
export default function NumberInput({
  value,
  name,
  setValue,
  label,
  min,
  max,
}: NumberInputProps) {
  return (
    <div className="flex flex-row items-center justify-center text-slate-200 gap-2">
      <label htmlFor={name} className="font-bold">
        {label}
      </label>
      <input
        className="text-slate-200 p-2 rounded-md bg-slate-800"
        type="number"
        min={min}
        max={max}
        value={value}
        name={name}
        onChange={(e) => setValue(parseInt(e.target.value, 10))}
      />
    </div>
  );
}
