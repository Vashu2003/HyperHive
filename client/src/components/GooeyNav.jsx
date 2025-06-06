import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

function GooeyNav({ items, initialActiveIndex = 0, setActiveIndex }) {
  const [activeIndex, _setActiveIndex] = useState(initialActiveIndex);
  const [blobStyle, setBlobStyle] = useState({ left: 0, width: 0 });
  const containerRef = useRef(null);

  const handleClick = (index) => {
    _setActiveIndex(index);
    setActiveIndex?.(index);
  };

  useEffect(() => {
    const activeEl = containerRef.current?.children?.[activeIndex];
    if (activeEl) {
      const { offsetLeft, offsetWidth } = activeEl;
      setBlobStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [activeIndex, items]);

  return (
    <div className="relative rounded-full p-0 flex items-center min-w-[300px] max-w-full">
      <motion.div
        className="absolute top-1 bottom-1 rounded-full bg-primary dark:bg-primary-dark z-0"
        animate={blobStyle}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />
      <div
        ref={containerRef}
        className="relative z-10 flex flex-grow justify-center items-center gap-2"
      >
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className={clsx(
              "relative px-4 py-2 text-sm font-mono font-semibold rounded-full transition-colors duration-200",
              index === activeIndex
                ? "text-text-light dark:text-text-light text-center"
                : "text-muted-dark dark:text-muted-light text-center"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default GooeyNav;
