prediction = "";

Webcam.set({
    width:350,
    height:300,
    image_format:'png'
});

camera = document.getElementById("camera");

Webcam.attach( '#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' +data_uri+'"/>';
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://storage.googleapis.com/tm-model/ry5PZ_wH_/model.json',modelLoaded);

function modelLoaded() {
    console.log('model Loaded!');
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "Our Prediction Is " + prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}

function check()
  {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
  }


function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    document.getElementById("result_emotion_name").innerHTML = results[1].label;
    prediction_1 = results[0].label;
    speak();
    if(results[0].label == "Awesome")
    {
	    document.getElementById("update_emoji").innerHTML = "&#129304;";
    }
    if(results[0].label == "Good")
    {
	    document.getElementById("update_emoji").innerHTML = "&#128077;";
    }
    if(results[0].label == "Victory")
    {
	    document.getElementById("update_emoji").innerHTML = "&#128076;";
    }

