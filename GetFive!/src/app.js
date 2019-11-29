
  //global values

  //the following are image links for the look of the dice. vn is always an image of the value (n) of n unheld dice (such as after a fresh roll), and vnb is the held version.
  const v1= `<img src="assets/Dice-1-b.svg" width="63" height="63">`;
  const v1b= `<img src="assets/Dice-1.svg" width="63" height="63">`;
  const v2= `<img src="assets/Dice-2-b.svg" width="63" height="63">`;
  const v2b= `<img src="assets/Dice-2.svg" width="63" height="63">`;
  const v3= `<img src="assets/Dice-3-b.svg" width="63" height="63">`;
  const v3b= `<img src="assets/Dice-3.svg" width="63" height="63">`;
  const v4= `<img src="assets/Dice-4-b.svg" width="63" height="63">`;
  const v4b= `<img src="assets/Dice-4.svg" width="63" height="63">`;
  const v5= `<img src="assets/Dice-5-b.svg" width="63" height="63">`;
  const v5b= `<img src="assets/Dice-5.svg" width="63" height="63">`;
  const v6= `<img src="assets/Dice-6a-b.svg" width="63" height="63">`;
  const v6b= `<img src="assets/Dice-6a.svg" width="63" height="63">`;

  const currentDiceRoll = [v1, v2, v3, v4, v5];
  const heldDice = [false, false, false, false, false];
  //idea is to have currentDiceRoll always reflect current state of dice. If the length of the currentDiceRoll index equals 3, this indicates don't reroll. These values can also be swapped around for the clickbutton function.

  var gameover = false;

  function loadStuff () {
    //set initial value if none exists
    if (localStorage.getItem ("effects")=== null) {
      localStorage.effects = false;
      console.log (localStorage.effects);
    }

    //tracks effects value after it's in place on subsequent reloads/plays
    if (localStorage.getItem ("effects") == "true")
      document.getElementById("effects").innerText = "effects on"
    else
      document.getElementById("effects").innerText = "effects off";
  }

  function showHighScores () {

    let highScoreString = "SCORE HISTORY: \n";

      let loadScores = JSON.parse(localStorage.getItem ("scores"));

      for (var key in loadScores) {
        let nameLength = loadScores [key] [1];
        let spaces = "";
        for (let x=0; x < (20-nameLength.length); x++)
          spaces += ' '
        highScoreString+= "\n" + loadScores [key] [1] + " scored " + loadScores [key] [0]+ " points on " + loadScores [key] [2] + ".";
      } if (highScoreString === "SCORE HISTORY: \n")
        highScoreString = "Your footsteps echo through an empty Hall of Records, inspiring you to action."
      alert (highScoreString);
    }


  function clearScoreHistory () {
    let check = confirm("Are you sure that you want to reset the entire score history?");
      if (check == true) {
        let scoreObject = {};
        localStorage.scores = JSON.stringify (scoreObject);
        localStorage.scorenum = 0;
    }
  }

  function resetgame () {
      let check = confirm("Are you sure that you want to reset the current game?");
      if (check == true) {
          location.reload ();
      }
  }

    function toggleSoundEffects () {
      if (document.getElementById ("effects").innerText !== "effects off") {
        document.getElementById ("effects").innerText = "effects off"
        localStorage.effects = false;
      } else { document.getElementById("effects").innerText = "effects on";
        localStorage.effects = true;
      }
    }

    function calculateSubtotals () {
      var toptable = document.getElementById ('top');
      var bonusTable = document.getElementById ('bonus');
      var bottomTable = document.getElementById ('bottom');
      var bonusTable2 = document.getElementById ('bonus2');
      var grandTotalTable = document.getElementById ('grandtotal');
      var topcount = 0;
      var lowercount = 0;
      var bonus2count = 0;

      for (let upperCount=0; upperCount<6; upperCount++) {
        if (toptable.rows [upperCount].cells[1].innerText !== "")
          topcount += parseInt((toptable.rows [upperCount].cells[1].innerText));
      }

      for (let bottomcount=0; bottomcount<7; bottomcount++) {
        if (bottomTable.rows [bottomcount].cells[1].innerText !== "")
          lowercount += parseInt((toptable.rows [upperCount].cells[1].innerText));
      }

      bonusTable.rows[0].cells[1].innerText = topcount;
      if (topcount >= 63)
        bonusTable.rows[1].cells[1].innerText = 35;

      if (bonusTable2.rows [0].cells[1].innerText !== "")
        bonus2Count = parseInt(bonusTable2.rows [0].cells [1].innerText)
      else bonus2Count = 0;

      grandTotalTable.rows[0].cells[1].innerText = topcount + lowercount + bonus2Count;
    }

    function submitValue (element) {

      var toptable = document.getElementById ('top');
      var bottomTable = document.getElementById ('bottom');
      var a= toptable.rows [element.rowIndex].cells [2].innerText;
      if (a !== "") {
        toptable.rows [element.rowIndex].cells [1].innerText = a.slice (1, a.length);
        toptable.rows [element.rowIndex].cells [2].innerText = '';

      for (let x=0; x<6; x++) {
        toptable.rows [x].cells [2].style.backgroundColor = "white";
        toptable.rows [x].cells [2].innerText = "";
      }

      for (let x=0; x<7; x++) {
        bottomTable.rows [x].cells [2].style.backgroundColor = "white";
        bottomTable.rows [x].cells [2].innerText = "";
      }

        document.getElementById("d1").style.color="white";
        document.getElementById("d2").style.color="white";
        document.getElementById("d3").style.color="white";
        document.getElementById("d4").style.color="white";
        document.getElementById("d5").style.color="white";

        document.getElementById('fb2').style.color="white";
        document.getElementById('fb1').innerText = '➀ ➁ ➂';
      }

      document.getElementById('rollerbutton').disabled=false;
      document.getElementById('rollerbutton').style.color='yellow';
      document.getElementById ("dice").style = "width:40%;height:40%"
      document.getElementById ('rolled').style = "width:50%;height:50%;display:none"

      document.getElementById ("d1").innerHTML = `<img src="assets/Dice-0.svg" width=63 height=63>`
      document.getElementById ("d2").innerHTML = `<img src="assets/Dice-0.svg" width=63 height=63>`
      document.getElementById ("d3").innerHTML = `<img src="assets/Dice-0.svg" width=63 height=63>`
      document.getElementById ("d4").innerHTML = `<img src="assets/Dice-0.svg" width=63 height=63>`
      document.getElementById ("d5").innerHTML = `<img src="assets/Dice-0.svg" width=63 height=63>`

      for (var x=0; x < heldDice.length; x++) {
        heldDice [x] = false;
      }

      if (document.getElementById ("effects").innerText === "effects on") {
        var snd = new Audio("assets/pencil-sound.wav");
        snd.play ();
      }

      calculateTotals ();

    }

    function submitValueBottom (element) {
      var toptable = document.getElementById ('top');
      var bottomTable = document.getElementById ('bottom');
      var a= bottomTable.rows [element.rowIndex].cells [2].innerText;
      if (a !== "") {
        bottomTable.rows [element.rowIndex].cells [1].innerText = a.slice (1, a.length);
        bottomTable.rows [element.rowIndex].cells [2].innerText = ''


      for (let x=0; x<7; x++) {
        bottomTable.rows [x].cells [2].style.backgroundColor = "white";
        bottomTable.rows [x].cells [2].innerText = "";
      }

        for (let x=0; x<6; x++) {
          toptable.rows [x].cells [2].style.backgroundColor = "white";
          toptable.rows [x].cells [2].innerText = "";
        }

        document.getElementById("d1").style.color="white";
        document.getElementById("d2").style.color="white";
        document.getElementById("d3").style.color="white";
        document.getElementById("d4").style.color="white";
        document.getElementById("d5").style.color="white";


        document.getElementById('fb1').innerHTML = '➀ ➁ ➂';

      }

      document.getElementById('rollerbutton').disabled = false;
      document.getElementById('rollerbutton').style.color='yellow';
      document.getElementById ("dice").style = "width:40%;height:40%"
      document.getElementById ('rolled').style = "width:50%;height:50%;display:none"

      document.getElementById('fb2').style.color="white";

      document.getElementById ("d1").innerHTML = `<img src="assets/Dice-0.svg" width=63 height=63>`
      document.getElementById ("d2").innerHTML = `<img src="assets/Dice-0.svg" width=63 height=63>`
      document.getElementById ("d3").innerHTML = `<img src="assets/Dice-0.svg" width=63 height=63>`
      document.getElementById ("d4").innerHTML = `<img src="assets/Dice-0.svg" width=63 height=63>`
      document.getElementById ("d5").innerHTML = `<img src="assets/Dice-0.svg" width=63 height=63>`

      for (var x=0; x < heldDice.length; x++) {
        heldDice [x] = false;
      }

      if (document.getElementById ("effects").innerText === "effects on") {
        var snd = new Audio("assets/pencil-sound.wav");
        snd.play ();
      }
      calculateTotals ();
    }

    function submitValueBonusChips (element) {
      var toptable = document.getElementById ('top');
      var bottomTable = document.getElementById ('bottom');
      var bonusTable2 = document.getElementById ("bonus2");
      var a= bonusTable2.rows [element.rowIndex].cells [2].innerText;
      if (a !== "") {
        if (bonusTable2.rows [0].cells[1].innerText !== '') {
          bonusTable2.rows [0].cells[1].innerText = parseInt(bonusTable2.rows [0].cells[1].innerText) + 100;
        } else {
          bonusTable2.rows [0].cells[1].innerText = "100";;
      }

      for (let x=0; x<7; x++) {
        bottomTable.rows [x].cells [2].style.backgroundColor = "white";
        bottomTable.rows [x].cells [2].innerText = "";
      }

      for (let x=0; x<6; x++) {
          toptable.rows [x].cells [2].style.backgroundColor = "white";
          toptable.rows [x].cells [2].innerText = "";
      }

        bonusTable2.rows [0].cells[2].innerText = '';
        bonusTable2.rows [0].cells[2].style.backgroundColor = "white";

        document.getElementById("d1").style.color="white";
        document.getElementById("d2").style.color="white";
        document.getElementById("d3").style.color="white";
        document.getElementById("d4").style.color="white";
        document.getElementById("d5").style.color="white";

        document.getElementById('fb1').innerHTML = '➀ ➁ ➂';
       // calculateSubtotals ();

      document.getElementById ("d1").innerHTML = `<img src="assets/Dice-0.svg" width=63 height=63>`
      document.getElementById ("d2").innerHTML = `<img src="assets/Dice-0.svg" width=63 height=63>`
      document.getElementById ("d3").innerHTML = `<img src="assets/Dice-0.svg" width=63 height=63>`
      document.getElementById ("d4").innerHTML = `<img src="assets/Dice-0.svg" width=63 height=63>`
      document.getElementById ("d5").innerHTML = `<img src="assets/Dice-0.svg" width=63 height=63>`

      for (var x=0; x < heldDice.length; x++) {
        heldDice [x] = false;
      }

      if (document.getElementById ("effects").innerText === "effects on") {
        var snd = new Audio("assets/pencil-sound.wav");
        snd.play ();
      }
    }
    calculateTotals ();
  }

  function diceClick (element) {

      console.log (element.id);

      let diceArray = ["d1", "d2", "d3", "d4", "d5"];
      let diceLook1 = [v1, v2, v3, v4, v5, v6];
      let diceLook2 = [v1b, v2b, v3b, v4b, v5b, v6b]

      for (let x=0; x<5; x++) {
        if ((element.id) === diceArray [x])
          heldDice [x] = !(heldDice [x]);
      }

      console.log (heldDice);

      for (let x=0; x<6; x++) {
        if (element.innerHTML === diceLook1 [x]) {
          element.innerHTML = diceLook2 [x];
          return;
        }

        if (element.innerHTML === diceLook2 [x]) {
          element.innerHTML = diceLook1 [x];
          return;
        }
      }

      console.log ("element" + element + "pressed")

    }

    function updateRollOnClick () {

      var rollText = (document.getElementById("fb1").innerText);

      if ((rollText=="➀ ➁ ➂")){
        document.getElementById("fb1").innerText = "➊ ➁ ➂";
        document.getElementById("fb2").style.color="white";
        rollText = "";
      }

      if (rollText=== "➊ ➁ ➂") {
        document.getElementById("fb1").innerHTML = "➊ ❷ ➂";
        console.log (rollText);
        rollText = "";
      }

      if (rollText === "➊ ❷ ➂") {
        document.getElementById("fb1").innerText = "➊ ❷ ❸";
        document.getElementById("rollerbutton").disabled = true;
        document.getElementById("rollerbutton").style.color="gray";

        document.getElementById("fb2").style.color = "black";
        document.getElementById("fb2").innerText = "Enter Score to End Turn";
      }
    }

    function randomizeUnheldDice () {

      const diceVariations = [v1,v2,v3,v4,v5,v6];
      let diceArray = ["d1", "d2", "d3", "d4", "d5"];

      for (var individualDiceRoll=0; individualDiceRoll < 6; individualDiceRoll++){
        let rand = (Math.floor(Math.random() * 6));
        currentDiceRoll [individualDiceRoll] = diceVariations [rand]
      }

      console.log (currentDiceRoll);
      console.log (heldDice);

      for (var displayRolledDice = 0; displayRolledDice < currentDiceRoll.length; displayRolledDice++)
        if (heldDice [displayRolledDice] === false)
          document.getElementById (diceArray [displayRolledDice]).innerHTML = currentDiceRoll [displayRolledDice];
    }

    function determineScoringOptions () {
      let diceNumbers = [0, 0, 0, 0, 0, 0];
      let diceArray = ["d1", "d2", "d3", "d4", "d5"];
      const diceVariations = [v1, v2, v3, v4, v5, v6];
      const diceVariations2 = [v1b, v2b, v3b, v4b, v5b, v6b]

      for (let x=0; x<5; x++) {
        for (let y=0; y<6; y++) {
          if ((document.getElementById (diceArray[x]).innerHTML === diceVariations [y]) ||
             (document.getElementById (diceArray[x]).innerHTML === diceVariations2 [y]))
             diceNumbers [y] += 1;
        }
      }

        console.log (diceNumbers);
        return diceNumbers;
    }

    function calculateCurrentScore (diceArray) {
      console.log (diceArray);
      let diceSum = 0;

      for (let x=0; x< diceArray.length; x++) {
          diceSum += diceArray [x] * (x+1);
          console.log (diceSum);
        }

      var topTable = document.getElementById ("top");
      var bottomTable = document.getElementById ("bottom");
      var bonusTable = document.getElementById ("bonus");
      var bonusTable2 = document.getElementById ("bonus2");
      var grandTotalTable = document.getElementById ("grandtotal");

      //checks for individual numbers for upper section
      if (topTable.rows[0].cells[1].innerText === "") {
        topTable.rows [0].cells [2].innerText = '←' + diceArray [0] * 1;
        if (topTable.rows [0].cells [2].innerText !== '←0')
          topTable.rows [0].cells [2].style.backgroundColor = "yellow"
        else topTable.rows [0].cells [2].style.backgroundColor = "white";
      }

      if (topTable.rows[1].cells[1].innerText === "") {
        topTable.rows [1].cells [2].innerText = '←' + diceArray [1] * 2;
        if (topTable.rows [1].cells [2].innerText !== '←0')
          topTable.rows [1].cells [2].style.backgroundColor = "yellow"
        else topTable.rows [1].cells [2].style.backgroundColor = "white";
      }

      if (topTable.rows[2].cells[1].innerHTML === "") {
        topTable.rows [2].cells [2].innerHTML = '←' + diceArray [2] * 3;
        if (topTable.rows [2].cells [2].innerText !== '←0')
          topTable.rows [2].cells [2].style.backgroundColor = "yellow"
        else topTable.rows [2].cells [2].style.backgroundColor = "white";
       }

      if (topTable.rows[3].cells[1].innerHTML === "") {
        topTable.rows [3].cells [2].innerHTML = '←' + diceArray [3] * 4;
      if (topTable.rows [3].cells [2].innerText !== '←0')
          topTable.rows [3].cells [2].style.backgroundColor = "yellow"
        else topTable.rows [3].cells [2].style.backgroundColor = "white";
      }

      if (topTable.rows[4].cells[1].innerHTML === '') {
        topTable.rows [4].cells [2].innerHTML = '←' + diceArray [4] * 5;
      if (topTable.rows [4].cells [2].innerText !== '←0')
          topTable.rows [4].cells [2].style.backgroundColor = "yellow"
        else topTable.rows [4].cells [2].style.backgroundColor = "white";
      }

      if (topTable.rows[5].cells[1].innerHTML === '') {
        topTable.rows [5].cells [2].innerHTML = '←' + diceArray [5] * 6;
      if (topTable.rows [5].cells [2].innerText !== '←0')
          topTable.rows [5].cells [2].style.backgroundColor = "yellow"
        else topTable.rows [5].cells [2].style.backgroundColor = "white";
      }

      //checks if three of any number
      if (bottomTable.rows[0].cells[1].innerText === '') {
        if ((diceArray.indexOf (3) !== -1) || (diceArray.indexOf (4) !== -1) || (diceArray.indexOf (5) !== -1))
          bottomTable.rows [0].cells [2].innerHTML = '←' + diceSum
        else bottomTable.rows [0].cells [2].innerHTML = '←' + 0;
        if (bottomTable.rows [0].cells [2].innerText !== '←0')
          bottomTable.rows [0].cells [2].style.backgroundColor = "yellow"
        else bottomTable.rows [0].cells [2].style.backgroundColor = "white";
      }

      //checks to see if there are four of any number. covers three of a kind, also.
      if (bottomTable.rows[1].cells[1].innerText === '') {
        if ((diceArray.indexOf (4) !== -1) || (diceArray.indexOf (5) !== -1))
          bottomTable.rows [1].cells [2].innerHTML = '←' + diceSum
        else bottomTable.rows [1].cells [2].innerHTML = '←' + 0;
        if (bottomTable.rows [1].cells [2].innerText !== '←0')
            bottomTable.rows [1].cells [2].style.backgroundColor = "yellow"
        else bottomTable.rows [1].cells [2].style.backgroundColor = "white";

        if (bottomTable.rows [1].cells [2].innerText !== '←0')
            bottomTable.rows [1].cells [2].style.backgroundColor = "yellow"
        else bottomTable.rows [1].cells [2].style.backgroundColor = "white";
      }

      //Get Five
      if (bottomTable.rows[5].cells[1].innerText === '') {
        if ((diceArray.indexOf (5)) !== -1) {
        bottomTable.rows [5].cells [2].innerText = '←' + 50;

        if (document.getElementById ("effects").innerText === "effects on") {
        var snd = new Audio("assets/cheer.mp3");
        snd.play ();
        }
      }
      else bottomTable.rows [5].cells[2].innerText = '←' + 0;

      if (bottomTable.rows [5].cells [2].innerText !== '←0')
          bottomTable.rows [5].cells [2].style.backgroundColor = "yellow"
        else bottomTable.rows [5].cells [2].style.backgroundColor = "white";
      }

      if (bottomTable.rows[5].cells[1].innerText === '50') {
        if ((diceArray.indexOf (5)) !== -1) {
          bonusTable2.rows [0].cells [2].innerText =  "+100";
            if (document.getElementById ("effects").innerText === "effects on") {
              var snd = new Audio("assets/cheer.mp3");
              snd.play ();
            }
          bonusTable2.rows [0].cells[2].style.backgroundColor = "yellow";
        }

      }

      //full house
      if (bottomTable.rows[2].cells[1].innerText === '') {
        if (((diceArray.indexOf (3) !== -1) && (diceArray.indexOf (2) !== -1)) || (diceArray.indexOf (5) !== -1))
          bottomTable.rows [2].cells[2].innerHTML = '←' + 25
        else bottomTable.rows[2].cells[2].innerHTML = '←' + 0;

        if (bottomTable.rows [2].cells [2].innerText !== '←0')
          bottomTable.rows [2].cells [2].style.backgroundColor = "yellow"
        else bottomTable.rows [2].cells [2].style.backgroundColor = "white";
      }

      //checks for variant ways in which a small straight could be represented

      if (bottomTable.rows[3].cells[1].innerText === '') {
        if (((diceArray [1] > 0) &&
            (diceArray [2] > 0) &&
            (diceArray [3] > 0) &&
            (diceArray [4] > 0)) ||

            ((diceArray [2] > 0) &&
            (diceArray [3] > 0) &&
            (diceArray [4] > 0) &&
            (diceArray [5] > 0)) ||

            ((diceArray [0] > 0) &&
             (diceArray [1] > 0) &&
             (diceArray [2] > 0) &&
             (diceArray [3] > 0)))

            bottomTable.rows [3].cells [2].innerHTML = '←' + 30;
             else bottomTable.rows [3].cells [2].innerHTML = '←' + 0;

        if (bottomTable.rows [3].cells [2].innerText !== '←0')
          bottomTable.rows [3].cells [2].style.backgroundColor = "yellow"
        else bottomTable.rows [3].cells [2].style.backgroundColor = "white";
      }


      //large straight representations
      if (bottomTable.rows[4].cells[1].innerText === '') {
       if (((diceArray [0] > 0) &&
           (diceArray [1] > 0) &&
           (diceArray [2] > 0) &&
           (diceArray [3] > 0) &&
           (diceArray [4] > 0)) ||

           ((diceArray [1] > 0) &&
            (diceArray [2] > 0) &&
            (diceArray [3] > 0) &&
            (diceArray [4] > 0) &&
            (diceArray [5] > 0)))

            bottomTable.rows [4].cells [2].innerHTML = '←' + 40;
       else
        bottomTable.rows [4].cells [2].innerHTML = '←' + 0;
       if (bottomTable.rows [4].cells [2].innerText !== '←0')
          bottomTable.rows [4].cells [2].style.backgroundColor = "yellow"
       else bottomTable.rows [4].cells [2].style.backgroundColor = "white";
      }

     //chance
      if (bottomTable.rows[6].cells[1].innerText === '') {
        bottomTable.rows [6].cells [2].innerHTML = '←' + diceSum;
        if (bottomTable.rows [6].cells [2].innerText !== '←0')
          bottomTable.rows [6].cells [2].style.backgroundColor = "yellow"
        else bottomTable.rows [6].cells [2].style.backgroundColor = "white";
      }

    }

  function calculateTotals () {
    let topTable = document.getElementById ('top');
    let bonusTable = document.getElementById ('bonus');
    let bottomTable = document.getElementById ('bottom');
    let bonusTable2 = document.getElementById ('bonus2');
    let grandTotalTable = document.getElementById ('grandtotal');

    let topSum = 0;
    let bonus = 0;
    let bottomSum = 0;
    let bonus2 = 0;

    for (let x=0; x<6; x++) {
      if (topTable.rows [x].cells[1].innerText !== "")
        topSum += parseInt (topTable.rows [x].cells [1].innerText);
    }

      bonusTable.rows [0].cells [1].innerText = topSum;

      if (topSum >= 63) {
        bonus = 35;
        bonusTable.rows [1].cells [1].innerText = bonus;
      }

      for (let x=0; x<7; x++) {
        if (bottomTable.rows [x].cells[1].innerText !== "")
        bottomSum += parseInt (bottomTable.rows [x].cells [1].innerText);
      }

      if (bonusTable2.rows [0].cells [1].innerText !== "")
        bonus2 = parseInt (bonusTable2.rows [0].cells [1].innerText);

     let finalScore = topSum + bonus + bottomSum + bonus2;

      grandTotalTable.rows[0].cells[1].innerText = finalScore;

      endgameCheck (finalScore);

  }

  function endgameCheck (finalScore) {
    var topTable = document.getElementById ("top");
    var bottomTable = document.getElementById ("bottom");
    var button = document.getElementById ("rollerbutton");
    var button2 = document.getElementById ("fb2");

    if ((topTable.rows[0].cells[1].innerText !== "") &&
        (topTable.rows[1].cells[1].innerText !== "") &&
        (topTable.rows[2].cells[1].innerText !== "") &&
        (topTable.rows[3].cells[1].innerText !== "") &&
        (topTable.rows[4].cells[1].innerText !== "") &&
        (topTable.rows[5].cells[1].innerText !== "") &&

        (bottomTable.rows[0].cells[1].innerText !== "") &&
        (bottomTable.rows[1].cells[1].innerText !== "") &&
        (bottomTable.rows[2].cells[1].innerText !== "") &&
        (bottomTable.rows[3].cells[1].innerText !== "") &&
        (bottomTable.rows[4].cells[1].innerText !== "") &&
        (bottomTable.rows[5].cells[1].innerText !== "") &&
        (bottomTable.rows[6].cells[1].innerText !== "")) {

          gameover = true;
          console.log ("gameover = " + gameover);
          button.innerText = "submit score of " + finalScore + " to the historical record";
        }
  }

  function secretMessage () {
    alert ("This game is dedicated to my faithful playtester.")
  }

  function rollTheDice() {
      //animateDice ();
      if (document.getElementById ("effects").innerText === "effects on") {
        var snd = new Audio("assets/dice-roll.mp3");
        snd.play ();
    }
      document.getElementById ("dice").style = "width:40%;height:40%;display:none;"
      document.getElementById ('rolled').style = "width:50%;height:50%;"
      if (document.getElementById ("rollerbutton").innerText !== "Roll") {
        result = prompt ("Please enter your name to submit to High Score List", "[enter name here]");

        if (result !== null) {
          let endscore = document.getElementById ("grandtotal").rows [0].cells [1].innerText;
          alert (result.toUpperCase () + ' has been added to the historical record with a score of ' + endscore + '. Select "show score history" to view all scores.');

          let currentScores = JSON.parse (localStorage.scores);
          let key = JSON.parse (localStorage.scorenum);
          let newScore = [];
          let date = new Date ();
          let clippedDate = date.toUTCString ();
          newScore [0] = endscore;
          newScore [1] = result.toUpperCase ();
          newScore [2] = clippedDate;

          currentScores [key+1] = newScore;
          localStorage.scores = JSON.stringify(currentScores);
          localStorage.scorenum = JSON.stringify (key + 1);
          location.reload ();
        }
      }

      updateRollOnClick ();
      randomizeUnheldDice ();
      var diceNumbers = determineScoringOptions ();
      calculateCurrentScore (diceNumbers);
    }

