import * as React from 'react';
import freshMandarin_1x from '../../../img/freshMandarin_1x.png';

export default function ExampleModal(props) {
  const handleClose = () => props.setOpen(false);

  return (
    <>
      <button
        style={{
          alignItems: 'center',
          height: '42px',
          marginLeft: '145px',
          marginRight: '27px',
          borderRadius: '30px',
          background: '#E47B00',
          width: '100px',
          color: 'white',
          marginTop: '25%',
        }}
      >
        Click
      </button>
      <img
        src={freshMandarin_1x}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
          marginTop: '45px',
          marginLeft: '75px',
        }}
        alt="modal2 in 이미지"
      />
      <button
        style={{
          height: '42px',
          marginLeft: '27px',
          marginRight: '27px',
          marginTop: '30px',
          width: '84%',
          borderRadius: '15px',
          background: '#E47B00',
          color: 'white',
        }}
      >
        열매를 수확해주세요!
      </button>
    </>
  );
}
