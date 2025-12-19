let handPose;
let video;
let hands = [];

function preload() {
    handPose = ml5.handPose();
}

function setup() {
    const ctx = createCanvas(1200, 850);
    ctx.center('horizontal');

    video = createCapture(VIDEO);
    video.size(1200, 850);
    video.hide();

    handPose.detectStart(video, gotHands);
}

// Callback function for when handPose outputs data
function gotHands(results) {
    // Save the output to the hands variable
    hands = results;
}

function draw() {
    image(video, 0, 0, width, height);
    // Draw all the tracked hand points
    for (let i = 0; i < hands.length; i++) {
        let hand = hands[i];
        for (let j = 0; j < hand.keypoints.length; j++) {
            let keypoint = hand.keypoints[j];
            fill(0, 255, 0);
            noStroke();
            circle(keypoint.x, keypoint.y, 10);
        }
    }
}
