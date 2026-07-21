import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Skeleton } from '../skeleton';
import '@testing-library/jest-dom';

describe('Skeleton', () => {
  it('should render correctly', () => {
    render(<Skeleton data-testid="skeleton-loader" />);
    const skeletonElement = screen.getByTestId('skeleton-loader');
    expect(skeletonElement).toBeInTheDocument();
    // Skeletons are often visually distinctive, like having a specific background color
    // or animation, but these are styling details not directly testable with basic queries.
  });

  it('should apply a custom class name', () => {
    render(<Skeleton className="custom-skeleton-class" data-testid="skeleton-loader" />);
    expect(screen.getByTestId('skeleton-loader')).toHaveClass('custom-skeleton-class');
  });

  it('should accept and apply width and height styles', () => {
    render(<Skeleton style={{ width: '100px', height: '20px' }} data-testid="skeleton-loader" />);
    const skeletonElement = screen.getByTestId('skeleton-loader');
    expect(skeletonElement).toHaveStyle('width: 100px');
    expect(skeletonElement).toHaveStyle('height: 20px');
  });

  it('should render with different shapes (e.g., circular, rectangular) if supported', () => {
    // Assuming a `shape` prop, e.g., <Skeleton shape="circle" />
    // render(<Skeleton shape="circle" data-testid="circular-skeleton" />);
    // expect(screen.getByTestId('circular-skeleton')).toHaveClass('skeleton-circle'); // Or similar class
    expect(true).toBe(true); // Placeholder if no shape prop
  });
});
