import React from 'react';

import FormButton from './Button';


export default {
  title: 'Components/Form/Button',
  component: FormButton,
};

const Template = (args) => <FormButton {...args}>Button</FormButton>;

export const Button = Template.bind({});
