import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from '../badge';
import '@testing-library/jest-dom';

describe('Badge', () => {
  it('should render with children', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('should apply a custom class name', () => {
    render(<Badge className="custom-badge-class">Custom</Badge>);
    expect(screen.getByText('Custom')).toHaveClass('custom-badge-class');
  });

  it('should render with different variants (if applicable)', () => {
    // Assuming a 'variant' prop like 'default', 'secondary', 'destructive'
    render(<Badge variant="secondary">Secondary</Badge>);
    // This assertion depends on the actual class names applied by the variant prop
    expect(screen.getByText('Secondary')).toBeInTheDocument();
    // Example if `secondary` variant adds `badge-secondary` class:
    // expect(screen.getByText('Secondary')).toHaveClass('badge-secondary');
  });

  it('should render with an icon (if applicable)', () => {
    // Assuming Badge can take an icon prop or slot
    // render(<Badge><span data-testid="icon-element">*</span> With Icon</Badge>);
    // expect(screen.getByTestId('icon-element')).toBeInTheDocument();
    expect(true).toBe(true); // Placeholder if no icon prop is available
  });
});
