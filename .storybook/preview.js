import { RecoilRoot } from 'recoil';
import 'antd/dist/antd.css';

/**
 * StoryBook 파라메터 설정
 *
 * actions: Event 발생 감지
 * controls: StoryBook 에서 컴포넌트 정적 핸들링
 */
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

/**
 * StoryBook Wrapper 설정
 *
 * Provider 와 같은 것 설정
 */
export const decorators = [
  (Story, context) => (
    <RecoilRoot>
      <Story {...context} />
    </RecoilRoot>
  ),
];
