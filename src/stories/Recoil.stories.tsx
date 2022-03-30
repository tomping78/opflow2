import { ComponentMeta, ComponentStory } from '@storybook/react';
import RecoilList from './RecoilList';
import {
  ArgsTable,
  Description,
  PRIMARY_STORY,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs';

export default {
  title: '예제/상태관리',
  component: RecoilList,
  parameters: {
      layout: 'fullscreen',
    docs: {
      page: () => (
        <>
          <Title>Title</Title>
          <Subtitle>Subtitle</Subtitle>
          <Description>TEST</Description>
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </>
      ),
    },
  },
} as ComponentMeta<typeof RecoilList>;

const Template: ComponentStory<typeof RecoilList> = args => (
  <RecoilList {...args} />
);
export const List = Template.bind({});
