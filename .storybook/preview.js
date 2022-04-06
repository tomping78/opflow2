import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.css';

/**
 * StoryBook 파라메터 설정
 *
 * actions: Event 발생 감지
 * controls: StoryBook 에서 컴포넌트 정적 핸들링
 */
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  previewTabs: {
    canvas: {
      hidden: true,
    },
  },
  viewMode: 'docs',
  docs: {
    source: {
      type: 'dynamic',
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
    <BrowserRouter>
      <RecoilRoot>
        <Story {...context} />
      </RecoilRoot>
    </BrowserRouter>
  ),
];
