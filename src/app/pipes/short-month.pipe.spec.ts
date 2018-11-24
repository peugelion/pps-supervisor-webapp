import { ShortMonthPipe } from './short-str.pipe';

describe('ShortMonthPipe', () => {
  it('create an instance', () => {
    const pipe = new ShortMonthPipe();
    expect(pipe).toBeTruthy();
  });
});
