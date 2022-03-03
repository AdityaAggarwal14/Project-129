song1= "";
song2= "";
leftwristx=0;
rightwristx=0;
leftwristy=0;
rightwristy=0;  
scoreLeftWrist= 0; 
song1_status = ""; 
song2_status = "";


function preLoad(){
    song1= loadSound("music.mp3");
    song2= loadSound("music2.mp3");
}

function setup(){
    canvas= createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet= ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function modelLoaded(){
    console.log("PoseNet is Initialized");
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        leftwristx= results[0].pose.leftWrist.x;
        leftwristy= results[0].pose.leftWrist.y;
        rightwristx= results[0].pose.rightWrist.x;
        rightwristy= results[0].pose.rightWrist.y;
        console.log("LeftWristx= "+leftwristx+"RightWristx"+rightwristx);
        console.log("LeftWristy= "+leftwristy+"RightWristy"+rightwristy);
        scoreLeftWrist =  results[0].pose.keypoints[9].score;
	console.log("scoreLeftWrist = " + scoreLeftWrist);
    }
}

function draw(){
    image(video,0,0,600,500);
    song1_status= song1.isPlaying();
    song2_status= song2.isPlaying();
    fill("#FF0000");
	stroke("#FF0000");
    if(scoreLeftWrist > 0.2)
	{
		circle(leftWristX,leftWristY,20);
        song1.stop();
        if(song2_status==false){
            song2.play();
            document.getElementById("song").innerHTML= "playing_peterpan";
        }
}
}
function play(){
    song.play();
}

