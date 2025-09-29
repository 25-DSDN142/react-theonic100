// ----=  HANDS  =----
/* load images here */
   let planeImage;
   let snake;
   let apple;
  function prepareInteraction(){
  planeImage = loadImage('/images/plane.png');
  snake=loadImage('/images/snake.jpg');
  apple=loadimage('/images/apple.webp');
   }
   
 


function drawInteraction(faces, hands) {
  // hands part
  // for loop to capture if there is more than one hand on the screen. This applies the same process to all hands.
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    //console.log(hand);
    if (showKeypoints) {
      drawConnections(hand)
    }

    // This is how to load in the x and y of a point on the hand.
let thumbTipX = hand.thumb_tip.x;
let thumbTipY = hand.thumb_tip.y;

    let indexFingerTipX = hand.index_finger_tip.x;
    let indexFingerTipY = hand.index_finger_tip.y;

    let middleFingerTipX = hand.middle_finger_tip.x;
let middleFingerTipY = hand.middle_finger_tip.y;

let ringFingerTipX = hand.ring_finger_tip.x;
let ringFingerTipY = hand.ring_finger_tip.y;

let pinkyFingerTipX = hand.pinky_finger_tip.x;
let pinkyFingerTipY = hand.pinky_finger_tip.y;



    /*
    Start drawing on the hands here
    */
   //background(0,0,0)
image(snake,0,0,1280,960)

    

   //Map for falling images
   fill(255, 196, 0)
  
   let y = map(frameCount, 0, 300, 0, height);
  //circle(90, y, 50); // circle goes from top to bottom
  image(planeImage,100,y);
    
  let y1 = map(frameCount,300, 500, 0, height);
  circle(500, y1, 50); // circle goes from top to bottom   

    let x = map(frameCount,300, 800, 0, height);
    let y2= map(frameCount,600, 900, 0, height);

  circle(x, y2, 50); // circle goes from top to bottom 
 
  //change background if statement 
  if(y>height&&y1>height&&y2>height){
    background(255, 89, 0)
  }

     let x1 = map(frameCount,900, 1200, 0, height);
    let y3= map(frameCount,900, 1200, 0, height);

  circle(x1, y3, 50); // circle goes from top to bottom 

     let x2 = map(frameCount,1300, 1500, 800, height);
    let y4= map(frameCount,1300, 1500, 200, height);

  circle(x2, y4, 50); // circle goes from top to bottom 
   
  if(y3>height&&y4>height){
    background(235, 58, 52)
  }
  
  
  //snake tail circles
  fill(204, 0, 255)
  
    ellipse(middleFingerTipX, middleFingerTipY, 80, 80);
    ellipse(ringFingerTipX, ringFingerTipY, 70, 70);
    ellipse(pinkyFingerTipX, pinkyFingerTipY, 60, 60);
   
   chameleonHandPuppet(hand)
    
  // drawPoints(hand)

  

    //fingerPuppet(indexFingerTipX, indexFingerTipY);


     /*
    Stop drawing on the hands here
    */
  }
  // You can make addtional elements here, but keep the hand drawing inside the for loop. 
  //------------------------------------------------------
}






function fingerPuppet(x, y) {
  fill(255, 38, 219) // pink
  ellipse(x, y, 100, 20)
  ellipse(x, y, 20, 100)

  fill(255, 252, 48) // yellow
  ellipse(x, y, 20) // draw center 

}


function pinchCircle(hand) { // adapted from https://editor.p5js.org/ml5/sketches/DNbSiIYKB
  // Find the index finger tip and thumb tip
  let finger = hand.index_finger_tip;
  //let finger = hand.pinky_finger_tip;
  let thumb = hand.thumb_tip;

  // Draw circles at finger positions
  let centerX = (finger.x + thumb.x) / 2;
  let centerY = (finger.y + thumb.y) / 2;
  // Calculate the pinch "distance" between finger and thumb
  let pinch = dist(finger.x, finger.y, thumb.x, thumb.y);

  // This circle's size is controlled by a "pinch" gesture
  fill(0, 255, 0, 200);
  stroke(0);
  strokeWeight(2);
  circle(centerX, centerY, pinch);

}

function chameleonHandPuppet(hand) {
  // Find the index finger tip and thumb tip
  // let finger = hand.index_finger_tip;

  let finger = hand.middle_finger_tip; // this finger now contains the x and y infomation! you can access it by using finger.x 
  let thumb = hand.thumb_tip;

  // Draw circles at finger positions
  let centerX = (finger.x + thumb.x) / 2;
  let centerY = (finger.y + thumb.y) / 2;
  // Calculate the pinch "distance" between finger and thumb
  let pinch = dist(finger.x, finger.y, thumb.x, thumb.y);

  // This circle's size is controlled by a "pinch" gesture
  fill(0, 255, 0, 127.5);
  stroke(0);
  strokeWeight(2);
  circle(centerX, centerY, pinch);
  

  let indexFingerTipX = hand.index_finger_tip.x;
  let indexFingerTipY = hand.index_finger_tip.y;
  
  //   noStroke()
  //    ellipse(indexFingerTipX, indexFingerTipY, 40, 40);
  //    fill(204, 0, 255,90);
  //   ellipse(indexFingerTipX, indexFingerTipY, 50, 50);
  //    fill(204, 0, 255,80);
  //    ellipse(indexFingerTipX, indexFingerTipY, 60, 60);
  //     fill(204, 0, 255,70);
  //     fill(0,0,0)
  //  circle(indexFingerTipX, indexFingerTipY, 20);

}

function drawConnections(hand) {
  // Draw the skeletal connections
  push()
  for (let j = 0; j < connections.length; j++) {
    let pointAIndex = connections[j][0];
    let pointBIndex = connections[j][1];
    let pointA = hand.keypoints[pointAIndex];
    let pointB = hand.keypoints[pointBIndex];
    stroke(255, 0, 0);
    strokeWeight(2);
    line(pointA.x, pointA.y, pointB.x, pointB.y);
  }
  pop()
}


// This function draw's a dot on all the keypoints. It can be passed a whole face, or part of one. 
function drawPoints(feature) {
  push()
  for (let i = 0; i < feature.keypoints.length; i++) {
    let element = feature.keypoints[i];
    noStroke();
    fill(0, 255, 0);
    circle(element.x, element.y, 10);
  }
  pop()

}