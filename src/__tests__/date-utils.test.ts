import { toDateFormat } from '../common/utils/date-utils';

describe('[date-utils:toDateFormat(디폴트 포맷)]', () => {
  it('2022-04-01T17:49:39.657` => `2022-04-01`', () => {
    expect(toDateFormat('2022-04-01T17:49:39.657')).toEqual('2022-04-01');
  });
  it('2022-04-02` => `2022-04-02`', () => {
    expect(toDateFormat('2022-04-02')).toEqual('2022-04-02');
  });
  it('20220403` => `2022-04-03`', () => {
    expect(toDateFormat('20220403')).toEqual('2022-04-03');
  });
  it('2022-01-04 12:11:02 => `2022-04-04`', () => {
    expect(toDateFormat('2022-01-04 12:11:02')).toEqual('2022-01-04');
  });
});

describe('[date-utils:toDateFormat(yyyyMMdd 포맷)]', () => {
  it('2022-04-01T17:49:39.657` => `20220401`', () => {
    expect(toDateFormat('2022-04-01T17:49:39.657', 'yyyyMMdd')).toEqual(
      '20220401',
    );
  });
  it('2022-04-02` => `20220402`', () => {
    expect(toDateFormat('2022-04-02', 'yyyyMMdd')).toEqual('20220402');
  });
  it('20220403` => `20220403`', () => {
    expect(toDateFormat('20220403', 'yyyyMMdd')).toEqual('20220403');
  });
  it('2022-01-04 12:11:02 => `20220404`', () => {
    expect(toDateFormat('2022-01-04 12:11:02', 'yyyyMMdd')).toEqual('20220104');
  });
});
