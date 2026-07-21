import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Switch } from '../switch';
import '@testing-library/jest-dom';

describe('Switch', () => {
  it('should render and be unchecked by default', () => {
    render(<Switch data-testid="my-switch" />);
    expect(screen.getByRole('switch')).not.toBeChecked();
  });

  it('should be checked when the checked prop is true', () => {
    render(<Switch checked data-testid="my-switch" />);
    expect(screen.getByRole('switch')).toBeChecked();
  });

  it('should call onCheckedChange handler when clicked', () => {
    const handleCheckedChange = vi.fn();
    render(<Switch onCheckedChange={handleCheckedChange} data-testid="my-switch" />);
    const switchElement = screen.getByRole('switch');
    fireEvent.click(switchElement);
    expect(handleCheckedChange).toHaveBeenCalledTimes(1);
    expect(handleCheckedChange).toHaveBeenCalledWith(true); // Assuming it toggles to true
  });

  it('should not call onCheckedChange handler when disabled', () => {
    const handleCheckedChange = vi.fn();
    render(
      <Switch disabled onCheckedChange={handleCheckedChange} data-testid="my-switch" />
    );
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeDisabled();
    fireEvent.click(switchElement);
    expect(handleCheckedChange).not.toHaveBeenCalled();
  });

  it('should display an optional label', () => {
    render(<Switch id="my-switch-input" label="Enable notifications" />);
    expect(screen.getByLabelText('Enable notifications')).toBeInTheDocument();
    expect(screen.getByLabelText('Enable notifications')).toHaveAttribute('id', 'my-switch-input');
  });

  it('should apply a custom class name', () => {
    render(<Switch className="custom-switch-class" data-testid="my-switch" />);
    expect(screen.getByRole('switch')).toHaveClass('custom-switch-class');
  });
});
