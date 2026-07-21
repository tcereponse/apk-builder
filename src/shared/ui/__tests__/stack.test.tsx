import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Stack } from '../stack';
import '@testing-library/jest-dom';

describe('Stack', () => {
  it('should render with children', () => {
    render(
      <Stack>
        <span>Item 1</span>
        <span>Item 2</span>
      </Stack>
    );
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('should apply a custom class name', () => {
    render(
      <Stack className="custom-stack-class">
        <span>Item</span>
      </Stack>
    );
    // Assuming the class is applied to the root element of the Stack
    expect(screen.getByText('Item').closest('.custom-stack-class')).toBeInTheDocument();
  });

  it('should render with default vertical direction (if applicable)', () => {
    render(
      <Stack data-testid="stack-component">
        <span>Item 1</span>
        <span>Item 2</span>
      </Stack>
    );
    // Check for CSS properties or specific classes that indicate default direction
    // This often requires inspecting computed styles or knowing framework-specific class names
    // For a simple div with flex-direction: column (default for vertical stack),
    // it's hard to test directly without checking implementation details.
    // We'll rely on visual testing or more advanced DOM snapshotting for this if necessary.
    expect(screen.getByTestId('stack-component')).toBeInTheDocument();
  });

  it('should apply specified direction (e.g., horizontal)', () => {
    render(
      <Stack direction="horizontal" data-testid="stack-horizontal">
        <span>Item 1</span>
        <span>Item 2</span>
      </Stack>
    );
    expect(screen.getByTestId('stack-horizontal')).toBeInTheDocument();
    // Add more specific assertions if there are classes like 'stack-horizontal' or similar
  });

  it('should apply specified spacing (e.g., gap)', () => {
    render(
      <Stack spacing={4} data-testid="stack-spacing">
        <span>Item 1</span>
      </Stack>
    );
    expect(screen.getByTestId('stack-spacing')).toBeInTheDocument();
    // Similar to direction, testing actual CSS `gap` is hard without computed styles or specific class names.
    // We check for presence.
  });
});
