//    Options menu 'options'
createSliderComponent(
  ["options"],
  [],
  400,
  300,
  300,
  1000,
  60,
  "both",
  "Volume",
  false,
  30,
  (value) => {
    ui.volume = value;
  },
  0,
  100
);
createGamePropertySelector(
  ["options"],
  [],
  250,
  500,
  300,
  500,
  60,
  "control",
  ["keyboard", "controller"],
  0,
  ["Keyboard and Mouse", "Gamepad"],
  40
);
