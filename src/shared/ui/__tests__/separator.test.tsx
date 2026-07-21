import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Separator } from '../separator';
import '@testing-library/jest-dom';

describe('Separator', () => {
  it('should render correctly', () => {
    render(<Separator data-testid="separator" />);
    expect(screen.getByTestId('separator')).toBeInTheDocument();
    expect(screen.getByTestId('separator')).toHaveAttribute('role', 'separator');
  });

  it('should have a default orientation of horizontal', () => {
    render(<Separator data-testid="separator" />);
    // Assuming default orientation applies aria-orientation attribute or specific class
    expect(screen.getByTestId('separator')).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('should apply horizontal orientation', () => {
    render(<Separator orientation="horizontal" data-testid="separator" />);
    expect(screen.getByTestId('separator')).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('should apply vertical orientation', () => {
    render(<Separator orientation="vertical" data-testid="separator" />);
    expect(screen.getByTestId('separator')).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('should apply a custom class name', () => {
    render(<Separator className="custom-separator-class" data-testid="separator" />);
    expect(screen.getByTestId('separator')).toHaveClass('custom-separator-class');
  });
});
