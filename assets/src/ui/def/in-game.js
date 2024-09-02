let bg1 = createUIImageComponent(
  ["in-game"],
  [],
  960,
  540,
  1920,
  1080,
  null,
  images.background.sea,
  false
)
let bg2 = createUIImageComponent(
  ["in-game"],
  [],
  960 * 3 - 4,
  540,
  1920,
  1080,
  null,
  images.background.sea,
  false
)
function tickBackground(dt){
  bg1.x -= dt
  bg2.x -= dt
  if(bg2.x <= 956){
    bg1.x += 1920
    bg2.x += 1920
  }
}