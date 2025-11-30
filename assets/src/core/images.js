class MAImageHandler {
  draw(img = "error", x, y, width, height, angle, ...otherParameters) {
    push(); //Save current position, rotation, etc
    if (angle) {
      translate(x, y); //Move middle to 0,0
      rotate(angle);
      this.draw(img, 0, 0, width, height, 0, ...otherParameters);
    } else {
      noSmooth();
      //Get from registry if it exists
      img = Registry.image_containers.has(img) ? Registry.image_containers.get(img) : img;
      if (img instanceof ImageContainer) {
        if (!img.image) return; //Cancel if no image loaded yet
        image(img.image, x, y, width, height, ...otherParameters);
      } else {
        //Try to draw it directly if not
        try {
          image(img, x, y, width, height, ...otherParameters);
        } catch (error) {
          //Replace with a working image, unless its an error
          if (img !== "error") this.draw("error", x, y, width, height, angle, ...otherParameters);
        }
      }
    }
    pop(); //Return to old state
  }
  commit() {
    Registry.images.forEach((i, n) => Registry.image_containers.add(n, new ImageContainer(i.path)));
  }
}

const ImageCTX = new MAImageHandler();

function drawImg(
  img = "error",
  x,
  y,
  width,
  height,
  ...otherParameters //IDK what else p5 image takes
) {
  ImageCTX.draw(img, x, y, width, height, 0, ...otherParameters);
  console.warn("Use of deprecated 'drawImg'");
}

function rotatedImg(img = "error", x, y, width, height, angle, ...otherParameters) {
  ImageCTX.draw(img, x, y, width, height, angle, ...otherParameters);
  console.warn("Use of deprecated 'rotatedImg'");
}
