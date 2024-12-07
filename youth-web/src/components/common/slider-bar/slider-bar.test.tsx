import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SliderBar from './slider-bar';
import { SliderBarProps } from './types';

describe('SliderBar Component', () => {
    const defaultProps: SliderBarProps = {
        setPoint: 50,
        handleChange: jest.fn(),
        min: 0,
        max: 100,
        step: 1,
        title: "Temperature Control",
        lowerLimitLabel: "Lower Limit",
        setPointLabel: "Set Point",
        upperLimitLabel: "Upper Limit",
        lowerLimitCount: 5,
        sx: {},
    };

    it('renders without crashing', () => {
        render(<SliderBar {...defaultProps} />);
        expect(screen.getByText(/Temperature Control/i)).toBeInTheDocument();
    });

    it('displays labels and values correctly', () => {
        render(<SliderBar {...defaultProps} />);
        expect(screen.getByText(defaultProps.lowerLimitLabel)).toBeInTheDocument();
        expect(screen.getByText(defaultProps.setPointLabel)).toBeInTheDocument();
        expect(screen.getByText(defaultProps.upperLimitLabel)).toBeInTheDocument();

        // Check values for min, setPoint, and max
        expect(screen.getByText(`${defaultProps.min} F`)).toBeInTheDocument();
        expect(screen.getByText(`${defaultProps.setPoint}`)).toBeInTheDocument();
        expect(screen.getByText(`${defaultProps.max} F`)).toBeInTheDocument();
    });

    it('displays lower limit count correctly', () => {
        render(<SliderBar {...defaultProps} />);
        expect(screen.getByText(`Lower limit passed ${defaultProps.lowerLimitCount} times in the last 24 hours`)).toBeInTheDocument();
    });

    it('calls handleChange when slider value is changed', () => {
        render(<SliderBar {...defaultProps} />);

        // Find the slider by role and change the value
        const slider = screen.getByRole('slider');
        fireEvent.change(slider, { target: { value: 70 } });

        // Check that handleChange was called
        expect(defaultProps.handleChange).toHaveBeenCalled();
    });

    it('applies custom styles passed through sx prop', () => {
        const customStyles = { bgcolor: 'blue' };
        render(<SliderBar {...defaultProps} sx={customStyles} />);

        // Check if the custom style is applied to the component
        const box = screen.getByText(/Temperature Control/i).closest('div');
        expect(box).toHaveStyle('background-color: blue');
    });
});