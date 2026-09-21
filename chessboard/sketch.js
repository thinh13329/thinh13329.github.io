function setup() {
  if (windowWidth > windowHeight) {
    createCanvas(windowWidth, windowHeight);
  }
  else {
    createCanvas(windowWidth, windowWidth);
  }
  
}

function draw() {
  background(220);
  chessBoard();      
}
function chessBoard () {
  let size = width/8;
  let isWhite = true;
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y <8; y ++) {
      if (isWhite) {
        fill("white");
      }
      else {
        fill("black");
      
      }
      square (x*size, y* size, size);
      isWhite = !isWhite;
    }
    isWhite = !isWhite;
  }
}
