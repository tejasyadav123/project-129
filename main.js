song = ""
song2 = ""

leftwristX = ""
leftwristY = ""
rightwristX = ""
rightwristY = ""

scoreLeftWrist = 0
song1_status = ""
song2_status = ""

scoreRightWrist = 0

function preload() {
    song = loadSound("music.mp3")
    song2 = loadSound("music2.mp3")
}

function setup() {
    canvas = createCanvas(600, 400)
    canvas.center()

    video = createCapture(VIDEO)
    video.hide()

    poseNet = ml5.poseNet(video, modelloaded)
    poseNet.on("pose", gotposeas)
}

function draw() {
    image(video, 0, 0, 600, 400)

    song1_status = song.isPlaying()
    song2_status = song2.isPlaying()

    if (scoreLeftWrist > 0.1) {
        fill("red")
        stroke("black")
        circle(leftwristX, leftwristY, 30)
        song2.stop()

        if (song1_status == false) {
            song1.play()
            document.getElementById("song_name").innerHTML = "peterpan song is playing"
        }

    }

    if()
}

function modelloaded() {
    console.log("Posenet is loaded")
}

function gotposeas(result) {
    if (result.lentgh > 0) {
        console.log(result)

        leftwristX = result[0].pose.leftWrist.x
        leftwristY = result[0].pose.leftwrist.y
        rightwristX = result[0].pose.rightwrist.x
        rightwristY = result[0].pose.rightwrist.y

        console.log("leftwristX" + leftwristX + "leftwristY" + leftwristY)
        console.log("rightwristX" + rightwristX + "rightwristY" + rightwristY)

        scoreLeftWrist = result[0].pose.keypoints[9].score
        scoreRightWrist = result[0].pose.keypoints[10].score
    }
}