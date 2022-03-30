import { ComponentMeta, ComponentStory } from '@storybook/react';
import ComponentButton from './atoms/Button';
import {
  ArgsTable,
  Description,
  PRIMARY_STORY,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs';

export default {
  title: '예제/버튼', // 스토리북에서 보여질 그룹과 경로 표시
  component: ComponentButton, // 어떤 컴포넌트를 문서화 할지
  parameters: {
    layout: 'fullscreen',
    controls: { exclude: ['children'] },
    docs: {
      page: () => (
        <>
          <Title>Button</Title>
          <Subtitle>예제용 버튼</Subtitle>
          <Description>설명</Description>
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </>
      ),
    },
  },
  argTypes: {
    type: {
      options: ['primary', 'ghost', 'dashed'],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof ComponentButton>;

const Template: ComponentStory<typeof ComponentButton> = args => (
  <ComponentButton {...args} />
);

export const Button = Template.bind({});
Button.args = {
  name: '버튼',
};
