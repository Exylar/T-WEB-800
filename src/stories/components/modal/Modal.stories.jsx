import React, { useState } from 'react';

import Modal from './modal';


export default {
  title: 'Components/Modal',
  component: Modal,
};


const Template = (args) => {
  const [modal, setModal] = useState(false);
  return (
    <Modal {...args} isOpen={modal} toggle={() => setModal(false)} />
  )
}

export const ModalTest = Template.bind({});