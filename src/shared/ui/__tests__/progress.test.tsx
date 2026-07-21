import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Progress } from '../progress';
import '@testing-library/jest-dom';

describe('Progress', () => {
  it('should render correctly with default value 0', () => {
    render(<Progress data-testid="progress-bar" />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute('aria-valuenow', '0');
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '100');
  });

  it('should render with a specific value', () => {
    render(<Progress value={50} data-testid="progress-bar" />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '50');
  });

  it('should render with a specific max value', () => {
    render(<Progress value={25} max={200} data-testid="progress-bar" />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '25');
    expect(progressBar).toHaveAttribute('aria-valuemax', '200');
  });

  it('should apply a custom class name', () => {
    render(<Progress className="custom-progress-class" data-testid="progress-bar" />);
    expect(screen.getByTestId('progress-bar')).toHaveClass('custom-progress-class');
  });

  it('should update the visual fill based on value (implicit)', () => {
    // Visual fill is typically handled by CSS, not directly testable via DOM queries alone.
    // We assert that the value attribute is correctly set, which drives the visual.
    render(<Progress value={75} data-testid="progress-bar" />);
    const progressBar = screen.getByTestId('progress-bar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '75');
    // If there's an internal element showing the fill, you might test its style:
    // expect(screen.getByTestId('progress-fill')).toHaveStyle('width: 75%');
  });
});
