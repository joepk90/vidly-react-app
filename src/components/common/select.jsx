import React from 'react';

const Select = ({ name, label, options, error, ...rest }) => {

    return (

        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <select
                className="form-control custom-select"
                id={name}
                name={name}
                {...rest}
            >
                {options.map((option) => {
                    return <option key={option.value} value={option.value}>{option.name}</option>
                })}

            </select>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
}

export default Select;