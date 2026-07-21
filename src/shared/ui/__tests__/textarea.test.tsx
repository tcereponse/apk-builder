import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Textarea } from '../textarea';
import '@testing-library/jest-dom';

describe('Textarea', () => {
  it('should render with a placeholder', () => {
    render(<Textarea placeholder="Enter description" />);
    expect(screen.getByPlaceholderText(/enter description/i)).toBeInTheDocument();
  });

  it('should display the correct value', () => {
    render(<Textarea value="Initial text" onChange={() => {}} />);
    expect(screen.getByDisplayValue(/initial text/i)).toBeInTheDocument();
  });

  it('should call onChange handler when value changes', () => {
    const handleChange = vi.fn();
    render(<Textarea onChange={handleChange} />);
    const textareaElement = screen.getByRole('textbox');
    fireEvent.change(textareaElement, { target: { value: 'Updated text' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(expect.any(Object)); // Event object
  });

  it('should be disabled when the disabled prop is true', () => {
    render(<Textarea disabled placeholder="Disabled Textarea" />);
    expect(screen.getByPlaceholderText(/disabled textarea/i)).toBeDisabled();
  });

  it('should apply a custom class name', () => {
    render(<Textarea className="custom-textarea-class" data-testid="textarea-test" />);
    expect(screen.getByTestId('textarea-test')).toHaveClass('custom-textarea-class');
  });
});
