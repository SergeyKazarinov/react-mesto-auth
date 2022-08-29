import React, {useState, useEffect} from "react";

const useFormValidation = (theFirstInput, theSecondInput) => {
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isButtonValid, setIsButtonValid] = useState(false);

  function handleTheFirstInputChange() {
    if(theFirstInput.current.validity.valid) {
      setIsEmailValid(true);
    }
    else {
      setIsEmailValid(false);
    }
  }

  function handleTheSecondInputChange() {
    if(theSecondInput.current.validity.valid) {
      setIsPasswordValid(true);
    }
    else {
      setIsPasswordValid(false);
    }
  }

  function resetValid() {
    setIsEmailValid(false);
    setIsPasswordValid(false);
  }

  useEffect(() => {
    setIsButtonValid(isEmailValid && isPasswordValid);
  }, [isEmailValid, isPasswordValid])
  
  return {isButtonValid, handleTheFirstInputChange, handleTheSecondInputChange, resetValid};
}

export default useFormValidation;