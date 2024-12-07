import React from 'react';
import { render, screen } from '@testing-library/react';
import ProgressBar from './progress-bar';
import '@testing-library/jest-dom';
import { ProgressBarProps } from './types';

describe('ProgressBar Component', () => {
    const defaultProps: ProgressBarProps = {
        progressUptime: 70,
        progressHealth: 85,
        llMinutes: 120,
        ulMinutes: 240,
    };

    it('renders with default props', () => {
        render(<ProgressBar {...defaultProps} />);
        
        expect(screen.getByText('Safety Score')).toBeInTheDocument();
        expect(screen.getByText('Uptime')).toBeInTheDocument();
        expect(screen.getByText('Health')).toBeInTheDocument();
        expect(screen.getByText('LL Minutes')).toBeInTheDocument();
        expect(screen.getByText('UL Minutes')).toBeInTheDocument();
    });

    it('displays the correct progress values', () => {
        render(<ProgressBar {...defaultProps} />);

        expect(screen.getByText('70%')).toBeInTheDocument();
        expect(screen.getByText('85%')).toBeInTheDocument();
    });

    it('displays custom labels if provided', () => {
        const customProps: ProgressBarProps = {
            ...defaultProps,
            title: 'Custom Safety Score',
            uptimeLabel: 'Custom Uptime',
            healthLabel: 'Custom Health',
            llMinutesLabel: 'Lower Limit Minutes',
            ulMinutesLabel: 'Upper Limit Minutes',
        };

        render(<ProgressBar {...customProps} />);

        expect(screen.getByText('Custom Safety Score')).toBeInTheDocument();
        expect(screen.getByText('Custom Uptime')).toBeInTheDocument();
        expect(screen.getByText('Custom Health')).toBeInTheDocument();
        expect(screen.getByText('Lower Limit Minutes')).toBeInTheDocument();
        expect(screen.getByText('Upper Limit Minutes')).toBeInTheDocument();
    });

    it('displays the correct LL and UL minutes', () => {
        render(<ProgressBar {...defaultProps} />);

        expect(screen.getByText('120')).toBeInTheDocument();
        expect(screen.getByText('240')).toBeInTheDocument();
    });

    it('applies custom sx styling', () => {
        const customSx = { bgcolor: 'red' };
        render(<ProgressBar {...defaultProps} sx={customSx} />);

        const container = screen.getByText('Safety Score').parentElement;
        expect(container).toHaveStyle('background-color: red');
    });
});