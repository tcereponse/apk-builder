import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from '../card';
import '@testing-library/jest-dom';

describe('Card', () => {
  it('should render with children', () => {
    render(<Card>Card Content</Card>);
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  it('should render with a title', () => {
    render(<Card title="My Card Title">Card Content</Card>);
    expect(screen.getByText('My Card Title')).toBeInTheDocument();
  });

  it('should render with a description', () => {
    render(<Card description="This is a card description.">Card Content</Card>);
    expect(screen.getByText('This is a card description.')).toBeInTheDocument();
  });

  it('should render with a footer', () => {
    render(<Card footer="Card Footer">Card Content</Card>);
    expect(screen.getByText('Card Footer')).toBeInTheDocument();
  });

  it('should render all parts: title, description, children, footer', () => {
    render(
      <Card
        title="Full Card"
        description="Detailed description."
        footer="End of Card"
      >
        Main body of the card.
      </Card>
    );
    expect(screen.getByText('Full Card')).toBeInTheDocument();
    expect(screen.getByText('Detailed description.')).toBeInTheDocument();
    expect(screen.getByText('Main body of the card.')).toBeInTheDocument();
    expect(screen.getByText('End of Card')).toBeInTheDocument();
  });

  it('should apply a custom class name', () => {
    render(<Card className="custom-card-class">Classy Card</Card>);
    expect(screen.getByText('Classy Card').closest('.custom-card-class')).toBeInTheDocument();
  });
});
