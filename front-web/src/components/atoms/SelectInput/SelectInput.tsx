interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectInputProps {
  label: string;
  name: string;
  options: SelectOption[];
  value: string | number;
  onChange: (value: number) => void;
}

export const SelectInput: React.FC<SelectInputProps> = ({
  label,
  name,
  options,
  value,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <label className={`flex flex-col`}>
      {label}
      <select
        id={name}
        name={name}
        className="border rounded p-2 mt-1"
        value={value}
        onChange={handleChange}
      >
        <option value="">Selecione...</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};