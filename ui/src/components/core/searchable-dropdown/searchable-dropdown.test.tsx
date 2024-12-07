import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchableDropdown from './searchable-dropdown';

describe('SearchableDropdown', () => {
  const defaultProps = {
    placeholder: 'Select an option',
    label: 'Test Label',
    name: 'testField',
    options: [
      { id: '1', name: 'Option 1' },
      { id: '2', name: 'Option 2' },
      { id: '3', name: 'Option 3' },
    ],
    value: null,
    loading: false,
    onChange: jest.fn(),
    onInputChange: jest.fn(),
    errors: {},
  };

  const setup = (props = {}) => {
    const setupProps = { ...defaultProps, ...props };
    return render(<SearchableDropdown {...setupProps} />);
  };

  it('renders the Autocomplete component with the correct label and placeholder', () => {
    setup();

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Select an option')).toBeInTheDocument();
  });

  it('displays the correct options', () => {
    setup();

    fireEvent.focus(screen.getByRole('combobox'));
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Option' } });

    const optionElements = screen.getAllByRole('option');
    expect(optionElements).toHaveLength(3);
    expect(optionElements[0]).toHaveTextContent('Option 1');
    expect(optionElements[1]).toHaveTextContent('Option 2');
    expect(optionElements[2]).toHaveTextContent('Option 3');
  });
  
  it('calls onChange when an option is selected', () => {
    setup();
  
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Option 2' } });
    fireEvent.click(screen.getByText('Option 2'));
  
    expect(defaultProps.onChange).toHaveBeenCalledWith({ id: '2', name: 'Option 2' });
  });

  it('calls onInputChange when input value changes', () => {
    setup();

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Option 1' } });

    expect(defaultProps.onInputChange).toHaveBeenCalledWith('Option 1');
  });

  it('displays an error message if provided', () => {
    const errors = { testField: { message: 'This field is required' } };
    setup({ errors });

    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('renders the loading spinner when loading is true', () => {
    setup({ loading: true });

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('does not render the loading spinner when loading is false', () => {
    setup();

    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  it('sets the value prop correctly in the Autocomplete component', () => {
    const value = { id: '1', name: 'Option 1' };
    setup({ value });

    expect(screen.getByDisplayValue('Option 1')).toBeInTheDocument();
  });
});
