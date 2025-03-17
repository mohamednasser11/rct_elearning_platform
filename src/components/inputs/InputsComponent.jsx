import './Inputs.styles.css'

const Input = ({type, placeholder, name, onChangeFunction}) => {

  return (
    <input className="input" name={name} type={type} placeholder={placeholder} onChange={onChangeFunction} />
  );
};


export default Input;