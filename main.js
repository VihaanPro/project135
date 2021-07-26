object=[];
video="";
    
function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
    video= createCapture(VIDEO);
	video.hide();
}
function draw(){
    image(video,0,0,480,380);
    if(status!=""){
        objectDetector.detect(video,gotReslt);
    for(i=0; i< object.length; i++){
        document.getElementById("status").innerHTML="Status : Detected";
        document.getElementById("number_of_objects").innerHTML="Number of objects detected are :"+ object.length;
        fill("#FF0000");
        percent=floor(object[i].confidence*100);
        text(object[i].label + "  " + percent +"%", object[i].x+15, object[i].y+15);
        noFill();
    stroke("#FF0000");
    rect(object[i].x,object[i].y,object[i].width, object[i].height);
    

    }
    }
}
function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
    value=document.getElementById("input").value;
    
   
    if(status ==value){
        var synth = window.speechSynthesis;
        var utterThis = new SpeechSynthesisUtterance(value + "found");
        synth.speak(utterThis); 
    }
    else{
        var synth = window.speechSynthesis;
    var utterThis = new SpeechSynthesisUtterance(value + "not found");
    synth.speak(utterThis);
    }
}
function modelLoaded(){
    console.log("model Loaded!");
    status=true;

}
function gotReslt(error,results){
if(error){
    console.log(error);
}
console.log(results);
object=results;
}
