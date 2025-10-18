import {useEffect, useState} from "react";

function UseDevice() {
  const [width, setWidth] = useState<number>(window.innerWidth)

  function handleWindowSizeChange() {
    setWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange)
    return () => window.removeEventListener('resize', handleWindowSizeChange)
  }, []);

  return {isMobile: width <= 768}
}

export default UseDevice;