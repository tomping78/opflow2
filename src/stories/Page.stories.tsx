import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { Page } from './Page';
import Boards from '../components/pages/Boards';

export default {
  title: '예제/페이지', // 스토리북에서 보여질 그룹과 경로 표시
  component: Boards, // 어떤 컴포넌트를 문서화 할지
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Page>;

const Template: ComponentStory<typeof Boards> = args => <Boards />;

export const 유형_A_예시 = Template.bind({});

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
유형_A_예시.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const loginButton = await canvas.getByRole('button', { name: /Log in/i });
  await userEvent.click(loginButton);
};
