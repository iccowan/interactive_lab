/*
    Interactive Lab - Win a Car
    Ian Cowan & Dean Cochran
    
    This game is simulated from Let's Make a Deal and allows the
    player to select from 3 curtains. Two of the curtains are bad curtains
    and then player wins only a toy car, whereas one of the curtains
    has a brand new car behind it. The player first selects one of the
    curtains and then one of the bad curtains is revealed. The player then
    gets to choose whether they want to keep their curtain or switch to
    the other curtain. The last selected curtain is then opened and the
    player gets to find out whether or not they have won a brand new car!
    
    Sound effects royalty free from: http://soundbible.com/
    Horn Honk (lose sound): http://soundbible.com/1048-Horn-Honk.html
    Shooting Star (win sound): http://soundbible.com/1744-Shooting-Star.html
*/

// Use the time to determine which curtain
// the winning car should be behind
// This will be a number {0,1,2}
var date = new Date();
var winCurtain = date.getTime() % 3;

// 0 => No curtains clicked
// 1 => First curtain clicked
// 2 => Finished
var state = 0;

/*
    Opens the specified curtain and reveals what is behind
    it to the player. It then announces to the player whether
    they have won or lost.
    
    Inputs:
        image: HTML Image Element
        curtainNum: Number
    Outputs:
        None
*/
var openCurtain = function(image, curtainNum) {
    // Open the winning curtain
    if(curtainNum == winCurtain) {
        image.attr("src", "images/win_car.png");
        image.attr("state", "open");
        d3.select("p").text("Congrats, you won a new car!");
        
        // Play the winning sound!
        d3.select("#winSound").node().play();
    } else {
        // Open a non-winning curtain
        image.attr("src", "images/lose_car.jpg");
        image.attr("state", "open");
        d3.select("p").text("Unfortunately, you only won a toy car, but please play again!");
        
        // Play the losing sound if the state is so
        if(state == 1) {
            d3.select("#loseSound").node().play();
        }
    }
};

/*
    This works for the first step and picks a bad curtain to
    open. The user is then invited to change their curtain if
    they would like or they can keep their own curtain.
    
    Inputs:
        image: HTML Image Element
    Outputs:
        None
*/
var openAnotherCurtain = function(image) {
    // Get the number of the selected curtain
    var curtainNum = Number(image.id);
    
    // Find another curtain that the user did not select and is not
    // the winning curtain to reveal the bad curtain
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
    
    // Give the user some new instructions
    d3.select("p")
      .text("Now, choose the curtain you would like to take home. Feel free to change your curtain!");
};


// This is the main brain of the project
d3.selectAll("img").on("click", function() {
    // Check and make sure the curtain is closed
    if(d3.select(this).attr("state") == "open") {
        return; //do nothing
    }
    
    // Now, let's check the state of the game and proceed as required
    if(state == 0) {
        // If we're at this state, let's open up one of the unclicked bad curtains
        openAnotherCurtain(this);
        
        // Update the state
        state = 1;
    } else if(state == 1) {
        // If we're at this state, we reveal the answer to the player
        // and let them choose to either stop or play again
        d3.select("body").append("h1")
          .text("Click Here to Play Again!")
          .attr("class", "replay")
          .on("click", function() {
            window.location.reload(false)
          });
        
        // Open their curtain
        openCurtain(d3.select(this), this.id);
        state = 2;
    }
});