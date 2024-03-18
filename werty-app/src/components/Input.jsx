import './Input.css';
import Error from './Error';

export default function Input({type, label, name, value, onChange, errorMessage, clearError}){
    const handleFocus=()=>{
        clearError();
    }
    return(
        <div className="mb-3">
            <label htmlFor={name} className="form-label">{label}</label>
            <input type={type} onFocus={handleFocus} className="form-control input-field" id={name} name={name} value={value} onChange={onChange} required/>
            {errorMessage && <Error message={errorMessage}></Error>}
        </div>

    )
}
