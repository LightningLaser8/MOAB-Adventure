//    Options menu 'options'
//Volume
createUIComponent(
  ["options"],
  [],
  385,
  235,
  0,
  0,
  "none",
  null,
  "Volume",
  false,
  30
)
createSliderComponent(
  ["options"],
  [],
  400,
  300,
  300,
  1100,
  60,
  "both",
  "Master",
  false,
  30,
  (value) => {
    ui.volume = value;
  },
  0,
  100
);
createSliderComponent(
  ["options"],
  [],
  375,
  400,
  250,
  425,
  60,
  "both",
  "Entities",
  false,
  20,
  (value) => {
    ui.piecewiseVolume.entities = value;
  },
  0,
  100,
  100
);
createSliderComponent(
  ["options"],
  [],
  1100,
  400,
  250,
  425,
  60,
  "both",
  "Weapons",
  false,
  20,
  (value) => {
    ui.piecewiseVolume.weapons = value;
  },
  0,
  100,
  100
);
createSliderComponent(
  ["options"],
  [],
  375,
  500,
  250,
  425,
  60,
  "both",
  "Music",
  false,
  20,
  (value) => {
    ui.piecewiseVolume.music = value;
  },
  0,
  100,
  100
);
createSliderComponent(
  ["//options"],
  [],
  1100,
  500,
  250,
  425,
  60,
  "both",
  "Other",
  false,
  20,
  (value) => {
    ui.piecewiseVolume.other = value;
  },
  0,
  100,
  100
);
//Controls
createGamePropertySelector(
  ["options"],
  [],
  250,
  700,
  300,
  500,
  60,
  "control",
  ["keyboard", "controller"],
  0,
  ["Keyboard and Mouse", "Gamepad"],
  40
);
