import { useState } from "react";

const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);
  const reset = () => {
    setValues(initialState);
  };
  const handleInputValue = ({target}) => {
    setValues({
      ...values,
      [target.name]: target.value,
    });
  };
  return [values, handleInputValue, reset];
};

export default useForm;
