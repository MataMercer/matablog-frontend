import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Header, HeaderProps } from '../components/Header';
import { IUser } from '../Types/IUser';

export default {
  title: 'Example/Header',
  component: Header,
} as Meta;

const Template: Story<HeaderProps> = (args) => <Header {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user: { username: 'Matamercer' } as IUser,
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
