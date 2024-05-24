import { useState } from "react";

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    setIsShowing(!isShowing);
  }

  function toggleOn(){
    setIsShowing(true);
  }


  return {
    isShowing,
    toggle,
    toggleOn,
  };
};

export default useModal;