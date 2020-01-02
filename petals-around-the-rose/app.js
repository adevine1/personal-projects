$(document).ready(function() {
  console.log("document ready");

  $("#rollbutton").click(function() {
    console.log("button pressed");
    let diceArray =[];
    let t = 0;
    for (let x=1; x<7; x++) {
      let randNum = (Math.floor(Math.random ()*6) + 1);
      diceArray.push (randNum);
      if (randNum==3)
        t += 2;
      if (randNum==5)
        t += 4;
    }

    $(".diceRoll").innerHTML= `
    <img id="d1" src="assets/Dice-3.png" width="63" height="63">
    <img id="d2" src="assets/Dice-3.png" width=63 height=63>
    <img id="d3" src="assets/Dice-4.png" width=63 height=63>
    <img id="d4" src="assets/Dice-2.png" width=63 height=63>
    <img id="d5" src="assets/Dice-1.png" width=63 height=63>
    <img id="d6" src="assets/Dice-6.png" width=63 height=63>
    `
    console.log (diceArray);
    console.log (t);
   });
});