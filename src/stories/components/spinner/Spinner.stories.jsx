import React from 'react';

import { Spinner } from './Spinner';

export default {
  title: 'Components/Spinner',
  component: Spinner,
};

const Template = (args) => <Spinner {...args} />;

export const Spin = Template.bind({});