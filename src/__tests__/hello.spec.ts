import { hello } from '../hello';
test('hello', () => {
  expect(hello()).toBe('hello');
});
