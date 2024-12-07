
import { convertDateTime } from "./date-formatter";
import moment from 'moment-timezone';

describe('convertDateTime', () => {

  it('should convert date to UTC ISO string when toUTC is true', () => {
    const date = '2024-08-05T10:00:00';
    const expectedUTC = moment(date).utc().toISOString();
    expect(convertDateTime(date, true)).toBe(expectedUTC);
  });

  it('should format date according to the provided timezone', () => {
    const date = '2024-08-05T10:00:00Z';
    const timezone = 'America/New_York';
    const format = 'LLLL';
    const expectedFormat = moment.utc(date).tz(timezone).format(format);
    expect(convertDateTime(date, false, timezone, format)).toBe(expectedFormat);
  });

  it('should format date according to the default format when no format is provided', () => {
    const date = '2024-08-05T10:00:00Z';
    const timezone = 'America/New_York';
    const expectedFormat = moment.utc(date).tz(timezone).format('LLLL');
    expect(convertDateTime(date, false, timezone)).toBe(expectedFormat);
  });

  it('should format date directly when no timezone is provided', () => {
    const date = '2024-08-05T10:00:00';
    const format = 'YYYY-MM-DD HH:mm:ss';
    const expectedFormat = moment(date).format(format);
    expect(convertDateTime(date, false, undefined, format)).toBe(expectedFormat);
  });
  
  it("should convert UTC date to hh:mm A format with timezone", () => {
    const date = '2024-08-05T10:00:00';
    const timezone = "Asia/Kolkata";
    const format = "hh:mm A";
    const expectedTime = moment.utc(date).tz(timezone).format(format);
    const convertedDate = convertDateTime(date, false, timezone, format);
    expect(convertedDate).toBe(expectedTime);
  });

  it('should throw an error for an invalid date', () => {
    expect(() => convertDateTime('invalid-date')).toThrow('Invalid date');
  });

  it('should throw an error for an invalid timezone', () => {
    expect(() => convertDateTime('2024-08-05T10:00:00Z', false, 'Invalid/Timezone')).toThrow('Invalid timezone');
  });

  it('should throw an error for a conversion error', () => {
    const date = '2024-08-05T10:00:00';
    jest.spyOn(moment.prototype, 'format').mockImplementation(() => {
      throw new Error('Conversion error');
    });

    expect(() => convertDateTime(date)).toThrow('Conversion error');
  });
});
