import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AccordionCheckboxList from './accordion-checkbox-list';
import '@testing-library/jest-dom';

describe('AccordionCheckboxList', () => {
  const mockOnChange = jest.fn();
  const items = [
    { id: '1', abrv: 'Item 1', isChecked: true },
    { id: '2', abrv: 'Item 2', isChecked: true },
    { id: '3', abrv: 'Item 3', isChecked: false },
  ];

  const setup = (props = {}) => {
    return render(
      <AccordionCheckboxList
        title="Test"
        items={items}
        valueField="id"
        labelField="abrv"
        onChange={mockOnChange}
        {...props}
      />
    );
  };

  test('renders without crashing', () => {
    const { getByText } = setup();
    expect(getByText('Test')).toBeInTheDocument();
  });

  test('handles checkbox toggle', () => {
    const { getByLabelText } = setup();
    fireEvent.click(getByLabelText('Item 1'));
    expect(mockOnChange).toHaveBeenCalledWith([
      { id: '1', abrv: 'Item 1', isChecked: false },
      { id: '2', abrv: 'Item 2', isChecked: true },
      { id: '3', abrv: 'Item 3', isChecked: false },
    ]);
  });

  test('handles select all', () => {
    const { getByLabelText } = setup();
    const selectAllCheckbox = getByLabelText('Select All');
    fireEvent.click(selectAllCheckbox);
    expect(mockOnChange).toHaveBeenCalledWith([
      { id: '1', abrv: 'Item 1', isChecked: true },
      { id: '2', abrv: 'Item 2', isChecked: true },
      { id: '3', abrv: 'Item 3', isChecked: true },
    ]);
  });

  test('handles view all functionality', () => {
    const { getByText, queryByText } = setup();
    fireEvent.click(getByText('View All'));
    expect(queryByText('Item 3')).toBeInTheDocument();
  });

  test('expands and collapses the accordion', () => {
    const { getByText, queryByText } = setup();
    fireEvent.click(getByText('Test'));
    expect(queryByText('Item 1')).toBeInTheDocument();
  });

});

