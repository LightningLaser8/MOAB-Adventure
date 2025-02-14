class FinalBoss extends Boss {
  destinationWorld = "";
  //5s default delay
  transportDelay = 600;
  //When the boss dies,
  onDeath(source) {
    //Do all the stuff bosses do,
    super.onDeath(source);
    //If there is a next world
    if (Registry.worlds.has(this.destinationWorld)) {
      //Create an effect as a warning, 3/4 of the way through the transport delay
      Timer.main.do(() => this.world.particles.push(
        new ShapeParticle(
          960,
          540,
          0,
          this.transportDelay*0.25,
          0,
          0,
          "rect",
          [255, 255, 255, 0],
          [255, 255, 255, 255],
          1080,
          1080,
          1920,
          1920,
          0,
          false
        ),
      ), this.transportDelay/4*3);
      //And add an operation to the timer
      Timer.main.do(
        //To move the player to a world,
        moveToWorld,
        //After the specified delay.
        this.transportDelay,
        //Passing in the next world to go to.
        this.destinationWorld
      );
    } else {
      //Create an effect as a warning, but don't wait
      this.world.particles.push(
        new ShapeParticle(
          960,
          540,
          0,
          this.transportDelay,
          0,
          0,
          "rect",
          [255, 255, 255, 0],
          [255, 255, 255, 255],
          1920,
          1920,
          1080,
          1080,
          0,
          false
        )
      );
      Timer.main.do(playerWins, this.transportDelay);
    }
  }
}
