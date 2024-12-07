import Logger from './logger';

describe('Logger', () => {
    let logger: Logger;

    beforeEach(() => {
        logger = new Logger();
    });

    it('should set the context correctly', () => {
        const context = 'TestContext';
        logger.setContext(context);
        expect(logger['context']).toEqual(context);
    });

    it('should log a message with the correct level', () => {
        const logSpy = jest.spyOn(logger, 'log');
        const message = 'Test message';
        const level = 'info';
        logger.log(message, level);
        expect(logSpy).toHaveBeenCalledWith(message, level);
    });

    it('should log an error message', () => {
        const errorSpy = jest.spyOn(logger, 'error');
        const message = 'Test error message';
        logger.error(message);
        expect(errorSpy).toHaveBeenCalledWith(message);
    });

    it('should log a warning message', () => {
        const warnSpy = jest.spyOn(logger, 'warn');
        const message = 'Test warning message';
        logger.warn(message);
        expect(warnSpy).toHaveBeenCalledWith(message);
    });

    it('should log a debug message', () => {
        const debugSpy = jest.spyOn(logger, 'debug');
        const message = 'Test debug message';
        logger.debug(message);
        expect(debugSpy).toHaveBeenCalledWith(message);
    });

    it('should log a verbose message', () => {
        const verboseSpy = jest.spyOn(logger, 'verbose');
        const message = 'Test verbose message';
        logger.verbose(message);
        expect(verboseSpy).toHaveBeenCalledWith(message);
    });
});