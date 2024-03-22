interface AppSelectProps {
  className?: string;
  defaultValue: string;
  onChange: (e: string) => void;
  options: string[];
}

export const AppSelect = ({
  onChange,
  options,
  className,
  defaultValue,
}: AppSelectProps) => {
  return (
    <select
      defaultValue={defaultValue}
      aria-label='Default select example'
      onChange={(e) => onChange(e.target.value)}
      className={['form-select', className].join(' ')}
    >
      <option value=''>show all</option>
      {options.map((opt) => (
        <option
          key={opt}
          value={opt}
        >
          {opt}
        </option>
      ))}
    </select>
  );
};
