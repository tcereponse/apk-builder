import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from '../checkbox';
import '@testing-library/jest-dom';

describe('Checkbox', () => {
  it('should render and be unchecked by default', () => {
    render(<Checkbox data-testid="my-checkbox" />);
    expect(screen.getByTestId('my-checkbox')).not.toBeChecked();
  });

  it('should be checked when the checked prop is true', () => {
    render(<Checkbox checked data-testid="my-checkbox" />);
    expect(screen.getByTestId('my-checkbox')).toBeChecked();
  });

  it('should call onCheckedChange handler when clicked', () => {
    const handleCheckedChange = vi.fn();
    render(<Checkbox onCheckedChange={handleCheckedChange} data-testid="my-checkbox" />);
    const checkbox = screen.getByTestId('my-checkbox');
    fireEvent.click(checkbox);
    expect(handleCheckedChange).toHaveBeenCalledTimes(1);
    expect(handleCheckedChange).toHaveBeenCalledWith(true); // Assuming it toggles to true
  });

  it('should not call onCheckedChange handler when disabled', () => {
    const handleCheckedChange = vi.fn();
    render(
      <Checkbox disabled onCheckedChange={handleCheckedChange} data-testid="my-checkbox" />
    );
    const checkbox = screen.getByTestId('my-checkbox');
    expect(checkbox).toBeDisabled();
    fireEvent.click(checkbox);
    expect(handleCheckedChange).not.toHaveBeenCalled();
  });

  it('should display an optional label', () => {
    render(<Checkbox id="my-checkbox-input" label="Remember me" />);
    expect(screen.getByLabelText('Remember me')).toBeInTheDocument();
    expect(screen.getByLabelText('Remember me')).toHaveAttribute('id', 'my-checkbox-input');
  });

  it('should apply a custom class name', () => {
    render(<Checkbox className="custom-checkbox-class" data-testid="my-checkbox" />);
    expect(screen.getByTestId('my-checkbox')).toHaveClass('custom-checkbox-class');
  });
});
