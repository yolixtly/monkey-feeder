"use strict"; 
$(document).ready(function() {
  

/*-----What do I need ? 
 1. An Array of Questions: questions, answers, correct answer(s).
 2. A function to loop through each question and separetly displays it (next question button); 
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

  var currentQuestion = 0;

  /*---------------------------------------------------------------------------------
      Question Object (DataBase) - MODEL 
  ---------------------------------------------------------------------------------*/
  function Question (question, choices, correctIndex) {
    this.question = question;
    this.choices = choices; 
    this.correctAnswer = correctIndex;
  };

  var questionOnDisplay = new Array();
    questionOnDisplay[0] = new Question (
      // question
      "Select the 3 correct ways to say <strong>Hello</strong> in Spanish",
      //the choices
      ["Hola!","hasta pronto!", "Hola, ¿qué hay?","Hasta mañana","Buenas tardes"],
      // the correct answer
      [0,2,4]
    );
    questionOnDisplay[1] = new Question (
      // question
      "How do you say “I’m hungover” in spanish?",
      //the choices
      ["Estoy crudo!","Estoy bien, gracias!"],
      // the correct answer
      [0]
    );
    questionOnDisplay[2] = new Question (
      // question
      "Select the option that translates to Spanish and in the same order the following list: “1. Blue, 2. Red, 3. Yellow”:",
      //the choices
      ["1. Azul, 2.  Rojo, 3. Amarillo", "1. Morado, 2. Blanco, 3. Gris", "1.Verde, 2. Rojo, 3. Rosa", "1. Negro, 2. Amarillo, 3. Verde"],
      // the correct answer
      [2]
    );
    questionOnDisplay[3] = new Question (
      // question
      "Is “mono” a way to say “monkey” in Spanish?",
      //the choices
      ["yes", "no"],
      // the correct answer
      [0]
    );     
    questionOnDisplay[4] = new Question (
      // question
      "How do you ask: “where is the toilet?” in spanish?",
      //the choices
      ["¿Dónde está la cocina?", "¿Dónde está el teléfono?","¿Dónde está el baño?"],
      // the correct answer
      [3]
    );         
    questionOnDisplay[5] = new Question (
      // question
      "Select the 2 correct ways to say “I love you” in Spanish:",
      //the choices
      ["te aprecio", "te amo", "te quiero","me gustas"],
      // the correct answer
      [1, 2]
    );
     questionOnDisplay[6] = new Question (
      // question
      "Is “Lunes” a:",
      //the choices
      ["Day of the week", "Mexican Actor", "Moon in spanish"],
      // the correct answer
      [0]
    );  
     questionOnDisplay[7] = new Question (
      // question
      "Dog is to “perro” as cat is to “gato”:",
      //the choices
      ["yes", "no"],
      // the correct answer
      [0]
    );   
     questionOnDisplay[8] = new Question (
      // question
      "Select the numerical option that translates: “uno, diez, cinco”:",
      //the choices
      ["2, 4, 6","1, 10, 5", "1, 12, 7"],
      // the correct answer
      [1]
    ); 
     questionOnDisplay[9] = new Question (
      // question
      "How do you say “I like programming!” in spanish:",
      //the choices
      ["Me gusta programar!", "Me gusta comer!"],
      // the correct answer
      [0]
    );      


   /*---------------------------------------------------------------------------------
     Event Handlers - VIEW
  ---------------------------------------------------------------------------------*/

  $("#game-section").hide();

  function modalBoxShow() {
      $("#how").click(function() {
      $("#modal").show();
    });

    $("#gotIt").click(function() {
     $("#modal").hide();
    });
  };

  modalBoxShow();

  function restart() {
    $("#new").click(function() {
      $("#game-section").hide();
      $("#init-page").show();
    });
  };

  restart();

  function startGame() {
    //Render Game Section
    $("#logo").click(function() {
      $("#init-page").hide();
      $("#game-section").show();
    }); 
    //render question group
    renderQuestion(currentQuestion);
    renderChoices(currentQuestion)
  };

  startGame();

  // console.log(questionestionOnDisplay.choice);
  function renderQuestion(currentQuestion) {
    var question = '<h1>' + questionOnDisplay[currentQuestion].question + '</h1>' ;
    $("#question").append(question);
  };

  function renderChoices(currentQuestion) {
    var showChoices = "<form id='answerSelect'>";
      $.each(questionOnDisplay[currentQuestion].choices, function(index, choice) {
        showChoices += '<div><input type="radio" id="answer-'+ index +'" name="answer" value=' + index +'"><label class="answer" for="answer-'+ index +'">' + choice + '</label></div>'; 
        console.log(choice);
      });
      showChoices += "</form>"
    $("#list-choices").append(showChoices); 
  };
});

