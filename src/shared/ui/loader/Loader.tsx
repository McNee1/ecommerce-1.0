export const Loader = () => {
  return (
    <div
      className='d-flex justify-content-center align-items-center'
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
      }}
    >
      <div
        className='spinner-border text-primary'
        style={{ width: '3em', height: '3em' }}
        role='status'
      ></div>
    </div>
  );
};
