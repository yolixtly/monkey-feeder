"use strict"; 
$(document).ready(function() {
  

/*-----What do I need ? 
 1. An Array of Questions: questions, answers, correct answer(s).
 2. A function to loop through each question and separetly display it (next question button); 
    - one is the brains (Model) the other is the View (UI)
 3. A  function to start a New Game from 0 (with a monkey button);
 4. A  Function to Re-start the game from 0;
 5. A  function to evaluate if the answer is correct or not.
 6. A  function to count the score (add or rest)
      - it adds or rest the count (Model)
      - it displays the progress in a progress bar (View) 
 7. A function to Show the Results 
 8. I want to add awesome effects to it! :) 
*/

  /*---------------------------------------------------------------------------------
      Question Object (DataBase) - MODEL 
  ---------------------------------------------------------------------------------*/
  function Question (question, choices, correctIndex) {
    this.question = question;
    this.choices = choices; 
    this.correctAnswer = correctIndex;
  };


  function modalBox(){
      $("#how").click(function() {
      $("#modal").show();
    });

    $("#gotIt").click(function() {
     $("#modal").hide();
    });
  };

  modalBox();
});