import Modal from './index';

export default {
  title: 'MODULES/Modal',
  component: Modal,
  argTypes: {},
};

const Template = (args) => <Modal {...args} />;

export const OpenModal = Template.bind({});
// props값 전달
OpenModal.args = {
  children: 'test',
  toggle: true,
};
