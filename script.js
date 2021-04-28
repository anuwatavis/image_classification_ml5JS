var controller = {
  rotX: 3.141,
  rotY: 0,
};

var type = "rab";

var obj;
let earthquakes;
async function setup() {
  createCanvas(600, 600, WEBGL);
  obj1 = loadModel("./rab.obj", true, success);
  obj2 = loadModel("./train.obj", true, success);
}

async function draw() {
  background("#222222");
  rotateZ(PI);
  rotateY(sin(frameCount * 0.03) / 2 + PI / 4);
  if (type === "rabbit") {
    model(obj1);
  }

  if (type === "fox") {
    model(obj2);
  }

  console.log(type);
  document.getElementById("type").innerText = type;
}

function success(data) {
  // Output the object to console to investigate its content
  console.log(data);
  // Now, how do I specify the fill color of an individual face?
  // Something like data.faces[0].fill('#ff7700'); would be desirable
  // but doesn't seem to be an option?
}

var s1 = function (sketch) {
  sketch.setup = function () {
    let canvas1 = sketch.createCanvas(100, 100, sketch.WEBGL);
    canvas1.position(0, 0);
  };
  sketch.draw = function () {
    //for canvas 1
    console.log(5554);
    sketch.background(100);
    sketch.rotateX(sketch.frameCount * 0.01);
    sketch.rotateZ(sketch.frameCount * 0.01);
    sketch.cone(30, 50);
  };
};

// create a new instance of p5 and pass in the function for sketch 1
var s = function (sketch) {
  var x = 100;
  var y = 100;
  let mobilenet;
  let classifier;
  let video;
  let label = "loading model";
  let happyButton;
  let sadButton;
  let trainButton;
  function modelReady() {
    console.log("Model is ready!!!");
    classifier.load("model.json", customModelReady);
  }

  function customModelReady() {
    console.log("Custom Model is ready!!!");
    label = "model ready";
    classifier.classify(gotResults);
  }

  function videoReady() {
    console.log("Video is ready!!!");
  }

  function gotResults(error, result) {
    if (error) {
      console.error(error);
    } else {
      // updated to work with newer version of ml5
      // label = result;
      label = result[0].label;
      if (label === "rabbit") {
        type = "rabbit";
      } else {
        type = "fox";
      }
      classifier.classify(gotResults);
    }
  }

  sketch.setup = function () {
    sketch.createCanvas(10, 10);
    video = sketch.createCapture(VIDEO);
    sketch.background(0);
    mobilenet = ml5.featureExtractor("MobileNet", modelReady);
    classifier = mobilenet.classification(video, videoReady);
  };

  sketch.draw = function () {
    sketch.background(0);
    sketch.filter(THRESHOLD);
    sketch.image(video, 0, 0, 100, 200);
    sketch.fill(255);
    sketch.textSize(16);
    sketch.text(label, 10, height - 10);
  };
};

var myp5_1 = new p5(s, "p5sketch");
