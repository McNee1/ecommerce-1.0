export const Loader = () => {
  return (
    <div
      style={{
        backgroundColor: '#fff',
        bottom: 0,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
      }}
      className='d-flex justify-content-center align-items-center'
    >
      <div
        role='status'
        className='spinner-border text-primary'
        style={{ height: '3em', width: '3em' }}
      ></div>
    </div>
  );
};
