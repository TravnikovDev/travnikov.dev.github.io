import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { render } from '../../../utils/test-utils';
import Footer from '../Footer';

// Mock current year to make the test deterministic
const mockDate = new Date(2024, 3, 1);
const originalDate = global.Date;
global.Date = class extends Date {
  constructor() {
    super();
    return mockDate;
  }
} as DateConstructor;

describe('Footer', () => {
  it('renders copyright text with current year', () => {
    render(<Footer />);
    expect(screen.getByText('© 2024 Roman Travnikov. All rights reserved.')).toBeInTheDocument();
  });

  it('is positioned at the bottom of the page', () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector('.footer');
    expect(footer).toHaveStyle({
      borderTop: '1px solid var(--mantine-color-dark-4)',
      background: 'var(--mantine-color-dark-8)',
    });
  });
});

// Restore original Date after tests
afterAll(() => {
  global.Date = originalDate;
});