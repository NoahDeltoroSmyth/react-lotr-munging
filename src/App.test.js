import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders films and characters links', () => {
  render(<App />);
  const films = screen.getByText(/Films/i);
  const characters = screen.getByText(/Characters/i);
  expect(films).toBeInTheDocument();
  expect(characters).toBeInTheDocument();
});
