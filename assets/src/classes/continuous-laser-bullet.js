class ContinuousLaserBullet extends LaserBullet {
  //Uses mostly the same functionality, really.
  step(dt) {
    super.step(dt)
    this.damaged = []
  }
}
