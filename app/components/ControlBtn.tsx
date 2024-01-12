import { arrow_next, arrow_prev } from './svgs';

interface Btn {
  handlePrevBtn: React.MouseEventHandler<HTMLElement>;
  handleNextBtn: React.MouseEventHandler<HTMLElement>;
}

const ControlBtn = ({ handleNextBtn, handlePrevBtn }: Btn) => {
  return (
    <div>
      <div className="inline" onClick={handlePrevBtn}>
        {arrow_prev}
      </div>{' '}
      <div className="inline" onClick={handleNextBtn}>
        {arrow_next}
      </div>
    </div>
  );
};

export default ControlBtn;
