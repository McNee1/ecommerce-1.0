import './checkbox.css';

interface CheckboxProps {
  id: number;
  onChecked: (check: boolean) => void;
}

export const Checkbox = ({ id, onChecked }: CheckboxProps) => {
  const myId = String(id);
  return (
    <div className='checkbox-wrapper-4'>
      <input
        id={myId}
        type='checkbox'
        className='inp-cbx'
        onChange={(e) => onChecked(e.target.checked)}
      />
      <label
        htmlFor={myId}
        className='cbx'
      >
        <span>
          <svg
            width='12px'
            height='10px'
          >
            <use xlinkHref='#check-4'></use>
          </svg>
        </span>
      </label>
      <svg className='inline-svg'>
        <symbol
          id='check-4'
          viewBox='0 0 12 10'
        >
          <polyline points='1.5 6 4.5 9 10.5 1'></polyline>
        </symbol>
      </svg>
    </div>
  );
};
