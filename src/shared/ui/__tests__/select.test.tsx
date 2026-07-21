import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Select, SelectItem } from '../select'; // Assuming SelectItem is also exported if needed
import '@testing-library/jest-dom';

describe('Select', () => {
  const options = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
  ];

  it('should render with options', () => {
    render(
      <Select value="" onChange={() => {}}>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </Select>
    );
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Banana')).toBeInTheDocument();
  });

  it('should display the selected value', () => {
    render(
      <Select value="banana" onChange={() => {}}>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </Select>
    );
    expect(screen.getByRole('combobox')).toHaveValue('banana');
  });

  it('should call onChange handler when a new option is selected', () => {
    const handleChange = vi.fn();
    render(
      <Select value="apple" onChange={handleChange}>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </Select>
    );
    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: 'cherry' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith('cherry');
  });

  it('should be disabled when the disabled prop is true', () => {
    render(
      <Select value="apple" disabled onChange={() => {}}>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </Select>
    );
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('should apply a custom class name', () => {
    render(
      <Select className="custom-select-class" value="apple" onChange={() => {}}>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </Select>
    );
    // Assuming the class is applied to the main select trigger element or its container.
    // If the component uses an internal mechanism to render, this might need adjustment.
    // For a simple `<select>` element, this works:
    expect(screen.getByRole('combobox')).toHaveClass('custom-select-class');
  });
});
