$(document).ready(function() {
  console.log("document ready");
  $("#rules").hide(0);
  let diceArray =[];
  let t = 6;

  $("#rollbutton").click(function() {
    diceArray = [];
    t=0;
    $("#entertext").val("");
    $("#resulttext").text("...")

    for (let x=1; x<7; x++) {
      let randNum = (Math.floor(Math.random ()*6) + 1);
      diceArray.push (randNum);
      if (randNum==3)
        t += 2;
      if (randNum==5)
        t += 4;
    }

    for (let x=0; x<6; x++) {
      $(`#d${x+1}`).attr ("src", `assets/Dice-${diceArray[x]}.png`);
    }
    console.log (diceArray);
    console.log (t);
   });

  $("#submitguess").click (function () {
    var str = $("#entertext").val();
    if (str == t) {
      console.log ("correct");
      $("#resulttext").text ("Correct! The total is " + t + ".");
    }
    else {
      console.log ("incorrect");
      $("#resulttext").text ("Incorrect. The total is " + t + ".");
    }
  })

  $("#rulesbutton").click (function () {
    $("#rules").toggle();
  })

});