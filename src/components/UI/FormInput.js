import './FormInput.css'

const FormInput = (props) => {

    let { inputLabel, inputType, inputName, inputValue, onHandleChange,errorMessage } = props
    

    return (
        <>
            <div className="form_input">
                <label htmlFor={inputName}>{inputLabel}</label>
                <input
                    type={inputType}
                    name={inputName}
                    id={inputName}
                    value={inputValue}
                    onChange={onHandleChange}
                />
            </div>
            {errorMessage !== "" && (<p>{errorMessage}</p>)}

        </>
    )
}

export default FormInput