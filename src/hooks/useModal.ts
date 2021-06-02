import { useState } from "react";

type UseModalHook = [boolean, () => void, () => void];

function useModal() {
  const [state, setState] = useState(false);

  function openModal() {
    setState(true);
  }

  function closeModal() {
    setState(false);
  }

  return [state, openModal, closeModal] as UseModalHook;
}

export default useModal;
