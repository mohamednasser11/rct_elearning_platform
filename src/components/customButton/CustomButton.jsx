import "./customButton.css";

const CustomButton = ({ buttonText, type, handleOnClick }) => {
    return (
      <button className="btn-custom" type={type} onClick={handleOnClick}>
        {buttonText}
      </button>
    );
  };


export default CustomButton;
