import React from 'react';

import FormNum from './NumInput';


export default {
  title: 'Components/Form/Number',
  component: FormNum,
};

const Template = (args) => <FormNum {...args} />;

export const Number = Template.bind({});
