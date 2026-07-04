import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { render } from '../../../utils/test-utils';
import Footer from '../Footer';

describe('Footer', () => {
  it('renders the brand name', () => {
    render(<Footer />);
    expect(screen.getByText('Roman Travnikov')).toBeInTheDocument();
  });

  it('shows the current year in the copyright line', () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(`© ${year}`)).toBeInTheDocument();
  });

  it('links to the primary email', () => {
    render(<Footer />);
    const email = screen.getByText('roman@travnikov.dev');
    expect(email).toHaveAttribute('href', 'mailto:roman@travnikov.dev');
  });
});
