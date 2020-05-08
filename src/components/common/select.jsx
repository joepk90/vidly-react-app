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
                <option defaultValue value="">Choose...</option>

                {options.map((option) => {
                    return <option key={option._id} value={option._id}>{option.name}</option>
                })}

            </select>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
}

export default Select;