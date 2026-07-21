import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '../input';
import '@testing-library/jest-dom';

describe('Input', () => {
  it('should render with a placeholder', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText(/enter text/i)).toBeInTheDocument();
  });

  it('should display the correct value', () => {
    render(<Input value="Test Value" onChange={() => {}} />);
    expect(screen.getByDisplayValue(/test value/i)).toBeInTheDocument();
  });

  it('should call onChange handler when value changes', () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'New Value' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(expect.any(Object)); // Event object
  });

  it('should be disabled when the disabled prop is true', () => {
    render(<Input disabled placeholder="Disabled Input" />);
    expect(screen.getByPlaceholderText(/disabled input/i)).toBeDisabled();
  });

  it('should apply a custom class name', () => {
    render(<Input className="custom-input-class" data-testid="input-test" />);
    expect(screen.getByTestId('input-test')).toHaveClass('custom-input-class');
  });

  it('should render with a specific type', () => {
    render(<Input type="password" placeholder="Password" />);
    expect(screen.getByPlaceholderText(/password/i)).toHaveAttribute('type', 'password');
  });
});
