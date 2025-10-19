import {useEffect, useState} from "react";

function UseDevice() {
  const [width, setWidth] = useState<number>(window.innerWidth)
  const [height, setHeight] = useState<number>(window.innerHeight)

  function handleWindowSizeChange() {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange)
    return () => window.removeEventListener('resize', handleWindowSizeChange)
  }, []);

  return {width, height, isMobile: width <= 768}
}

export default UseDevice;