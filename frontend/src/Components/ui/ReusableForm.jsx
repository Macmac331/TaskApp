import { useState } from "react";
import SubmitButton from "./SubmitButton";

const ReusableForm = ({ formFields, handleSubmit, disabled }) => {
  const [formData, setFormData] = useState(
    formFields.reduce((acc, field) => {
      acc[field.name] = '';
      return acc;
    }, {})
  );

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (e) => {
    handleSubmit(formData, e);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center p-4 rounded-lg w-full">
      {formFields.map((field) => (
        <div key={field.name} className="w-full mb-4">
          <label htmlFor={field.name} className="block mb-2 font-semibold">
            {field.label} 
          </label>
          <input
            id={field.name}
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            value={formData[field.name]}
            min={field.type === 'date' ? getTodayDate() : undefined}
            onChange={handleChange}
            className="p-3 w-full rounded-md border-2"
          />
        </div>
      ))}
      <SubmitButton value={'Submit'} disabled={disabled} />
    </form>
  );
};

export default ReusableForm;
