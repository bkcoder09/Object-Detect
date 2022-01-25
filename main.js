status = "";
objects = [];

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.size();
    video.hide();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status - Detecting Objects =D";
}

function modelLoaded(){
    console.log(" The Model Is Loaded ");
    status = true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}

function draw(){
    image(video, 0, 0, 380, 380);

    if(status != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult)
        for(i=0; i < objects.length; i++){
        document.getElementById("status").innerHTML = "Status - Detecting Object =D";
        document.getElementById("object_number").innerHTML = " Number Of Object Detected - "+objects.length+" :D";
        fill(r, g, b);
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label+" "+percent+"%", objects[i].x+15, objects[i].y+15);
        noFill();
        stroke(r, g, b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}