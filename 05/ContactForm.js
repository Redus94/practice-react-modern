import React, { useReducer, useState } from 'react';
import PropTypes from 'prop-types';

const ContactForm = function ContactForm(props) {
    const { fieldsElements } = props;

    const init = {};
    fieldsElements.forEach(({ name, defaultValue }) => {
        init[name] = defaultValue;
    });

    const validate = (data, values) => {
        const errors = [];
        data.forEach(({ name, validation }) => {
            const value = values[name];

            if (validation.isReq && value === '') {
                errors.push(`Pole ${name} jest Wymagane!`);
            }

            if (validation.regex && !validation.regex.test(value)) {
                errors.push(`Nie poprawny format pola ${name}`);
            }
        });

        return errors;
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case 'change': {
                return { ...state, [action.key]: action.value };
            }
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, init);
    const [errors, setErrors] = useState([]);

    const renderFieldsElements = () =>
        fieldsElements.map(({ name, type }) => {
            let field;
            if (type === 'textarea') {
                field = (
                    <textarea
                        onChange={(e) => dispatch({ type: 'change', key: name, value: e.target.value })}
                        id={name}
                        type={type}
                        value={state[name]}
                    />
                );
            } else {
                field = (
                    <input
                        onChange={(e) => dispatch({ type: 'change', key: name, value: e.target.value })}
                        id={name}
                        type={type}
                        value={state[name]}
                    />
                );
            }

            return (
                <div>
                    <label htmlFor={name}>{name}</label> {field}
                </div>
            );
        });

    const handleSubmit = (e) => {
        e.preventDefault();

        setErrors(validate(fieldsElements, state));
    };

    const renderErrors = function renderErrors() {
        return (
            errors.length > 0 && (
                <ul style={{ color: 'red' }}>
                    {errors.map((error) => (
                        <li>{error}</li>
                    ))}
                </ul>
            )
        );
    };

    return (
        <form onSubmit={handleSubmit}>
            {renderFieldsElements()}
            <div>
                <input type="submit" />
            </div>
            {renderErrors()}
        </form>
    );
};

ContactForm.propTypes = {
    fieldsElements: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            type: PropTypes.string,
            defaultValue: PropTypes.string,
        }),
    ).isRequired,
};

export default ContactForm;
