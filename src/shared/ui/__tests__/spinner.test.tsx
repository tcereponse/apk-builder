import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Spinner } from '../spinner';
import '@testing-library/jest-dom';

describe('Spinner', () => {
  it('should render correctly', () => {
    render(<Spinner data-testid="spinner-loader" />);
    const spinnerElement = screen.getByTestId('spinner-loader');
    expect(spinnerElement).toBeInTheDocument();
    expect(spinnerElement).toHaveAttribute('role', 'status');
  });

  it('should apply a custom class name', () => {
    render(<Spinner className="custom-spinner-class" data-testid="spinner-loader" />);
    expect(screen.getByTestId('spinner-loader')).toHaveClass('custom-spinner-class');
  });

  it('should have an aria-label for accessibility', () => {
    render(<Spinner aria-label="Loading content" data-testid="spinner-loader" />);
    expect(screen.getByLabelText('Loading content')).toBeInTheDocument();
  });

  it('should apply size styles (if applicable)', () => {
    // Assuming a `size` prop or direct style application
    render(<Spinner style={{ width: '24px', height: '24px' }} data-testid="spinner-loader" />);
    const spinnerElement = screen.getByTestId('spinner-loader');
    expect(spinnerElement).toHaveStyle('width: 24px');
    expect(spinnerElement).toHaveStyle('height: 24px');
  });
});
