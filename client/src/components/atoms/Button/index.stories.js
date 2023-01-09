import ExampleButton from './index';

export default {
  title: 'ATOMS/Button', // 스토리북 메뉴
  component: ExampleButton, // 렌더링될 컴포넌트
};

const Template = (args) => <ExampleButton {...args} />; // 렌더링
export const BlueButton = Template.bind({});

// props값 전달
BlueButton.args = {
  backgroundColor: 'blue',
};
