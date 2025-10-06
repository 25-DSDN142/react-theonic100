// ----=  HANDS  =----
/* load images here */
   let snake;
   let score=0
  let handCenterX;
  let handCenterY;
  let circle1X;
let circle1Y = 0;
let circle1Speed = 3;
 

//let circleSpeed=5;

function prepareInteraction(){
  snake=loadImage('/images/snake.jpg');
  // Start the falling circle at a random horizontal position
  circle1X = random(width);
 

 

  
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
   
   noStroke()
if(score<5){
   image(snake,0,0,1280,960)
}

     fill(255, 196, 0);
  circle(circle1X, circle1Y, 50);
// this section here was assisted by ai 
  // move the circle down
  circle1Y += circle1Speed;

  // if circle point Y is below the height of the screen reset it and bring it to the top at a random point but starting at Y 0
  if (circle1Y > height) {
    circle1Y = 0;
    circle1X = random(width);
  }


  
  
  //snake tail circles
  fill(204, 0, 255)
  
    ellipse(middleFingerTipX, middleFingerTipY, 80, 80);
    ellipse(ringFingerTipX, ringFingerTipY, 70, 70);
    ellipse(pinkyFingerTipX, pinkyFingerTipY, 60, 60);
    
    
    
    chameleonHandPuppet(hand)
     function chameleonHandPuppet(hand) {
 // noStroke()
  // Find the index finger tip and thumb tip
  // let finger = hand.index_finger_tip;

  let finger = hand.middle_finger_tip; // this finger now contains the x and y infomation! you can access it by using finger.x 
  let thumb = hand.thumb_tip;

  // Draw circles at finger positions
  let centerX = (finger.x + thumb.x) / 2;
  let centerY = (finger.y + thumb.y) / 2;
  handCenterX=centerX
  handCenterY=centerY
  // Calculate the pinch "distance" between finger and thumb
  let pinch = dist(finger.x, finger.y, thumb.x, thumb.y);

  // This circle's size is controlled by a "pinch" gesture
  fill(0, 255, 0, 127.5);
  stroke(0);
  strokeWeight(2);
  circle(centerX, centerY, pinch);
  

  let indexFingerTipX = hand.index_finger_tip.x;
  let indexFingerTipY = hand.index_finger_tip.y;
      }

      
       ///////////////////////////////////


///////////////////////////
// --- Collision detection ---
// detect handcenter x,y and circlex,y and if the distance is less than 50 add 1 to the score and start the loop again witht the coin
  let d = dist(handCenterX, handCenterY, circle1X, circle1Y);
  if (d < 50) { // 50 = radius of circle
    score += 1;
    circle1Y = 0;
    circle1X = random(width);
    //console.log("Score: " + score);
  }

  // --- Scoreboard ---
  fill(52, 180, 235);
  noStroke();
  rect(550, 18, 180, 60, 10);

  fill(0);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Score: " + score, 640, 48);
  




  

  // drawPoints(hand)

  

    //fingerPuppet(indexFingerTipX, indexFingerTipY);


     /*
    Stop drawing on the hands here
    */
  }
  // You can make addtional elements here, but keep the hand drawing inside the for loop. 
  //------------------------------------------------------







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

// function chameleonHandPuppet(hand) {
//  // noStroke()
//   // Find the index finger tip and thumb tip
//   // let finger = hand.index_finger_tip;

//   let finger = hand.middle_finger_tip; // this finger now contains the x and y infomation! you can access it by using finger.x 
//   let thumb = hand.thumb_tip;

//   // Draw circles at finger positions
//   let centerX = (finger.x + thumb.x) / 2;
//   let centerY = (finger.y + thumb.y) / 2;
//   // Calculate the pinch "distance" between finger and thumb
//   let pinch = dist(finger.x, finger.y, thumb.x, thumb.y);

//   // This circle's size is controlled by a "pinch" gesture
//   fill(0, 255, 0, 127.5);
//   stroke(0);
//   strokeWeight(2);
//   circle(centerX, centerY, pinch);
  

//   let indexFingerTipX = hand.index_finger_tip.x;
//   let indexFingerTipY = hand.index_finger_tip.y;



//}

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
}