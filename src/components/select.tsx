import { useState } from 'preact/hooks';
import './select.css'; // Import CSS for styling
import { ReactSVG } from 'react-svg';
import dropdown from "../assets/dropdown.svg";


interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  defaultValue: string;
  onChange?: (selectedValue: string) => void;
}


const Select = ({ options, defaultValue, onChange }: SelectProps) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue);

  const handleOptionChange = (event: Event) => {
    const select = event.target as any;
    if (!select) return;

    const selectedValue = select.value as string;
    setSelectedOption(selectedValue);
    if (onChange) {
      onChange(selectedValue);
    }
  };

  return (
    <div className="select-container">
      <select className="select" value={selectedOption} onChange={handleOptionChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      <div className="dropdown-arrow">
        <ReactSVG src={dropdown} />
      </div>
    </div>
  );
};

export default Select;
