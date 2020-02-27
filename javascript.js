// Use the time to determine which curtain
// the winning car should be behind
// This will be a number {0,1,2}
var date = new Date();
var winCurtain = date.getTime() % 3;
console.log("6");

// 0 => No curtains clicked
// 1 => First curtain clicked
// 2 => Finished
var state = 0;
console.log(12);

// Open the curtain
var openCurtain = function(image) {
    var curtainNum = image.attr("id");
    if(curtainNum == winCurtain) {
        image.attr("src", "images/win_car.png");
    } else {
        image.attr("src", "images/lose_car.png");
    }
}

var openAnotherCurtain = function(image) {
    var curtainNum = image.attr("id");
    
    if(0 != curtainNum && 0 != winCurtain) {
        var curtainToOpen = d3.select("#0");
        openCurtain(curtainToOpen);
    } else if(1 != curtainNum && 1 != winCurtain) {
        var curtainToOpen = d3.select("#1");
        openCurtain(curtainToOpen);
    } else {
        var curtainToOpen = d3.select("#2");
        openCurtain(curtainToOpen);
    }
    
    d3.select("p")
      .text("Now, choose the curtain you would like to take home. Feel free to change your curtain!");
}

d3.selectAll("img")
  .on("click", function() {
    console.log("Image clicked");
    
    if(state == 0) {
        openAnotherCurtain(this);
        state = 1;
    } else if(state == 1) {
        d3.select("body").append("h1")
          .text("Click Here to Play Again!")
          .on("click", reload(false));
        
        finishGame(this);
        state = 2;
    }
  });