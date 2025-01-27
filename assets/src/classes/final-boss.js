class FinalBoss extends Boss {
  destinationWorld = "ocean-skies";
  //5s default delay
  transportDelay = 600;
  //When the boss dies,
  onDeath(source) {
    //Do all the stuff bosses do,
    super.onDeath(source)
    //And add an operation to the timer
    Timer.main.addOperation(
      //To move the player to the next world,
      () => moveToWorld(this.destinationWorld),
      //After the specified delay.
      this.transportDelay
    );
  }
}
