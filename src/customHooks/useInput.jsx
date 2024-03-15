import { useState } from "react";

// Input value 값 체크 hooks
const useInputValidation = (initialState) => {
  const [formData, setFormData] = useState(initialState);
  const [error, setErrors] = useState({});
  const [isValid, setIsValid] = useState(true);

  const validateInput = () => {
    let newIsValid = true;
    const newErrors = {};

    for (const key in formData) {
      if (!formData[key].trim()) {
        newErrors[key] = "This field is required";
        newIsValid = false;
      }
    }

    setErrors(newErrors);
    setIsValid(newIsValid);
  };
};
