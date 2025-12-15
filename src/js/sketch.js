//Global
let bodyPose;
let video;
let poses = [];
let connections;

// preload the model
function preload() {
    // load the bodyPose model
    bodyPose = ml5.bodyPose();
}

// When the video is loaded, start detecting pose
function setup() {
    console.log("Setup starting...");
    createCanvas(640, 480);

    console.log("Requesting camera access...");
    video = createCapture(VIDEO, () => {
        console.log("Camera access granted!");
    });
    video.size(640, 480);
    video.hide();

    bodyPose.detectStart(video, gotPoses);

    connections = bodyPose.getSkeleton();
    console.log("Setup complete");
}

// Callback function for when the model returns pose data
function gotPoses(results) {
    // Store the model's results in a global variable
    poses = results;
}

function draw() {
    // Display the video
    image(video, 0, 0, width, height);
    // Draw the skeleton connections
    for (let i = 0; i < poses.length; i++) {
        let pose = poses[i];
        for (let j = 0; j < connections.length; j++) {
            let pointAIndex = connections[j][0];
            let pointBIndex = connections[j][1];
            let pointA = pose.keypoints[pointAIndex];
            let pointB = pose.keypoints[pointBIndex];
            // Only draw a line if we have confidence in both points
            if (pointA.confidence > 0.1 && pointB.confidence > 0.1) {
                stroke(255, 0, 0);
                strokeWeight(2);
                line(pointA.x, pointA.y, pointB.x, pointB.y);
            }
        }
    }
    // Iterate through all the poses
    for (let i = 0; i < poses.length; i++) {
        let pose = poses[i];
        // Iterate through all the keypoints for each pose
        for (let j = 0; j < pose.keypoints.length; j++) {
            let keypoint = pose.keypoints[j];
            // Only draw a circle if the keypoint's confidence is greater than 0.1
            if (keypoint.confidence > 0.1) {
                fill(0, 255, 0);
                noStroke();
                circle(keypoint.x, keypoint.y, 10);
            }
        }
    }
}

preload()
setup()