//    Options menu 'options'

//Volume sliders
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
);
SoundCTX.volume.gain.setValueAtTime(0.5, 0);
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
    SoundCTX.volume.gain.setValueAtTime(value / 100, 0);
  },
  0,
  100
);
SoundCTX.piecewiseVolume.entities.gain.setValueAtTime(0.5, 0);
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
    SoundCTX.piecewiseVolume.entities.gain.setValueAtTime(value / 200, 0);
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
    SoundCTX.piecewiseVolume.weapons.gain.setValueAtTime(value / 100, 0);
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
    SoundCTX.piecewiseVolume.music.gain.setValueAtTime(value / 100, 0);
  },
  0,
  100,
  100
);
createSliderComponent(
  ["options"],
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
    SoundCTX.piecewiseVolume.other.gain.setValueAtTime(value / 100, 0);
  },
  0,
  100,
  100
);

//Control Scheme
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
