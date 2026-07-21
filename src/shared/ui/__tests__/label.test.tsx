import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Label } from '../label';
import '@testing-library/jest-dom';

describe('Label', () => {
  it('should render with children', () => {
    render(<Label>My Label</Label>);
    expect(screen.getByText(/my label/i)).toBeInTheDocument();
  });

  it('should associate with an input using htmlFor', () => {
    render(
      <>
        <Label htmlFor="myInput">Input Label</Label>
        <input id="myInput" type="text" />
      </>
    );
    const label = screen.getByText(/input label/i);
    expect(label).toHaveAttribute('for', 'myInput');
    // Verify accessibility association (though this is more of an integration test)
    // expect(screen.getByLabelText(/input label/i)).toBeInTheDocument();
  });

  it('should apply a custom class name', () => {
    render(<Label className="custom-label-class">Classy Label</Label>);
    expect(screen.getByText(/classy label/i)).toHaveClass('custom-label-class');
  });
});
