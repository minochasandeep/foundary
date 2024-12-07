import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import "@testing-library/jest-dom";
import NavMenuItem from './nav-menu-item';


describe('NavMenuItem', () => {
  const mockText = 'Home';
  const mockRoute = '/home';

  it('renders the component with text', () => {
    render(
      <BrowserRouter>
        <NavMenuItem text={mockText} route={mockRoute} />
      </BrowserRouter>
    );
    expect(screen.getByText(mockText)).toBeInTheDocument();
  });
});