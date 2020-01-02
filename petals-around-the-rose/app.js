$(document).ready(function() {
  console.log("document ready");
  let diceArray =[];
  let t = 0;

  $("#rollbutton").click(function() {
    diceArray = [];
    t=0;
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
    if (str== t) {
      console.log ("correct");
      $("#resulttext").innerHTML = "correct";
    }
    else
      console.log ("incorrect");
  })

});