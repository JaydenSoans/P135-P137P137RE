status ="";
objects =[];
target = "";
label = "";

function setup(){
    canvas = createCanvas(480,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(400,400);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    target = document.getElementById("target").value;
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    console.log(target);
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(video,0,0,480,380);
    if(status !=""){
        objectDetector.detect(video, gotResults);
        for(i=0;i<objects.length;i++){
            fill("#FF0000");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            
            if(objects[i].label==target){
                video.stop();
                objectDetector.detect(gotResults);
                document.getElementById("status").innerHTML = "Status : " +  target + " Found";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(target + "Found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("status").innerHTML = "Status : " + target + " Not Found";
            }
        }
    }

}