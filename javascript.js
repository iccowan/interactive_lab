// Use the time to determine which curtain
// the winning car should be behind
// This will be a number {0,1,2}
var date = new Date();
var winCurtain = date.getTime() % 3;

// 0 => No curtains clicked
// 1 => First curtain clicked
// 2 => Finished
var state = 0;

// Open the curtain
var openCurtain = function(image, curtainNum) {
    if(curtainNum == winCurtain) {
        image.attr("src", "images/win_car.png");
        d3.select("p").text("Congrats, you won a new car!");
    } else {
        image.attr("src", "images/lose_car.jpg");
        d3.select("p").text("Unfortunately, you only won a toy car, but please play again!");
    }
}

// Open another curtain and allow the person to change, if they want
var openAnotherCurtain = function(image) {
    var curtainNum = Number(image.id);
    
    if(0 != curtainNum && 0 != winCurtain) {
        var curtainToOpen = d3.select(".zero");
        openCurtain(curtainToOpen, 0);
    } else if(1 != curtainNum && 1 != winCurtain) {
        var curtainToOpen = d3.select(".one");
        openCurtain(curtainToOpen, 1);
    } else {
        var curtainToOpen = d3.select(".two");
        openCurtain(curtainToOpen, 2);
    }
    
    d3.select("p")
      .text("Now, choose the curtain you would like to take home. Feel free to change your curtain!");
}


// This is the main brain of the project
d3.selectAll("img").on("click", function() {
    if(state == 0) {
        openAnotherCurtain(this);
        state = 1;
    } else if(state == 1) {
        d3.select("body").append("h1")
          .text("Click Here to Play Again!")
          .attr("class", "replay")
          .on("click", function() {
            window.location.reload(false)
          });
        
        openCurtain(d3.select(this), this.id);
        state = 2;
    }
});