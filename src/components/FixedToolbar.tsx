import { Toolbar, SaveButton, DeleteButton } from "react-admin";
import { useLayoutEffect, useState } from "react";

const FixedToolbar = () => {
  const [mode, setMode] = useState("sticky");
  const [fixedStyle, setFixedStyle] = useState({});

  useLayoutEffect(() => {
    const card = document.querySelector(".RaEdit-card, .RaCreate-card");
    if (!card) return;

    const update = () => {
      const rect = card.getBoundingClientRect();
      const fitsViewport = rect.height <= window.innerHeight;

      setMode(fitsViewport ? "sticky" : "fixed");

      if (!fitsViewport) {
        setFixedStyle({
          width: rect.width,
          left: rect.left,
        });
      } else {
        setFixedStyle({});
      }
    };

    update(); // первый расчёт

    const observer = new ResizeObserver(update);
    observer.observe(card);

    window.addEventListener("resize", update);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <Toolbar
      sx={{
        position: mode,
        bottom: 0,
        zIndex: 1300,
        backgroundColor: "background",
        minHeight: 64,
        boxSizing: "border-box",
        justifyContent: "space-between",
        ...(mode === "fixed" && fixedStyle),
      }}
    >
      <SaveButton />
      <DeleteButton size={"medium"} />
    </Toolbar>
  );
};

export default FixedToolbar;
