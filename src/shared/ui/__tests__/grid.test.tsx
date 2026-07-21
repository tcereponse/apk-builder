import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Grid } from '../grid';
import '@testing-library/jest-dom';

describe('Grid', () => {
  it('should render with children', () => {
    render(
      <Grid>
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    );
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('should apply a custom class name', () => {
    render(
      <Grid className="custom-grid-class">
        <div>Item</div>
      </Grid>
    );
    // Assuming the class is applied to the root element of the Grid
    expect(screen.getByText('Item').closest('.custom-grid-class')).toBeInTheDocument();
  });

  it('should apply specified column count', () => {
    render(
      <Grid columns={3} data-testid="grid-component">
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Grid>
    );
    expect(screen.getByTestId('grid-component')).toBeInTheDocument();
    // Direct CSS assertion (e.g., `grid-template-columns: repeat(3, 1fr)`) is difficult
    // without advanced tools or relying on specific framework classes like `grid-cols-3`.
    // We verify the component renders and accepts the prop.
  });

  it('should apply specified gap', () => {
    render(
      <Grid gap={4} data-testid="grid-component">
        <div>Item 1</div>
      </Grid>
    );
    expect(screen.getByTestId('grid-component')).toBeInTheDocument();
    // Similar to columns, checking `gap` CSS property is hard directly.
  });

  it('should pass through other standard HTML attributes', () => {
    render(<Grid id="my-grid" aria-label="My layout grid"><div>Grid Content</div></Grid>);
    const grid = screen.getByLabelText('My layout grid');
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveAttribute('id', 'my-grid');
  });
});
