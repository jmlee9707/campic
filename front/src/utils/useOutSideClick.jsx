import { useEffect } from "react";

// custom hook, ref로 지정한 요소의 밖 클릭시 callback 함수 실행
function useOutSideClick(ref, callback) {
  useEffect(() => {
    const handleClick = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback?.();
      }
    };
    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, [ref, callback]);
}

export default useOutSideClick;
