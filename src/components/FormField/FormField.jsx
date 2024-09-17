import './FormField.scss';

function FormField({ className, type, placeholder, name, value }) {
  return (
    <>
      {type === 'textarea' ? (
        <textarea
          className={`form-field ${className}`}
          name={name}
          value={value}
          placeholder={placeholder}
        />
      ) : (
        <input
          className={`form-field ${className}`}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
        />
      )}
    </>
  );
}

export default FormField;
