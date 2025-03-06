import { render, screen, fireEvent } from '@testing-library/react';
import SoundForm from './SoundForm';
import useSound from 'use-sound';
import '@testing-library/jest-dom';

// Mock useSound
vi.mock('use-sound', () => {
    const playSound = vi.fn();
    const stopSound = vi.fn();
    return {
    
       default: vi.fn(() => [playSound, { stop: stopSound }])
    } 
        
});

describe('SoundForm Component', () => {
    it('renders the component with play and stop buttons', () => {
        render(<SoundForm />);
        expect(screen.getByText('Play Sound')).toBeInTheDocument();
        expect(screen.getByText('Stop Sound')).toBeInTheDocument();
        expect(screen.getByText('Falls gewünscht, kannst Du Dir hier entspannte Piano Musik zu Deiner Meditation anmachen:')).toBeInTheDocument();
    });

    it('calls playSound when the play button is clicked', () => {
        const playSoundMock = vi.fn();
        const stopSoundMock = vi.fn();
        useSound.mockReturnValue([playSoundMock, { stop: stopSoundMock }]);

        render(<SoundForm />);
        fireEvent.click(screen.getByText('Play Sound'));
        expect(playSoundMock).toHaveBeenCalledTimes(1);
    });

    it('calls stopSound when the stop button is clicked', () => {
        const playSoundMock = vi.fn();
        const stopSoundMock = vi.fn();
        useSound.mockReturnValue([playSoundMock, { stop: stopSoundMock }]);

        render(<SoundForm />);
        fireEvent.click(screen.getByText('Stop Sound'));
        expect(stopSoundMock).toHaveBeenCalledTimes(1);
    });
});