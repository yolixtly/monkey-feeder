"use strict"; 
$(document).ready(function() {
  

/*-----What do I need ? 
 1. An Array of Questions: questions, answers, correct answer(s). DONE
 2. A function to loop through each question and separetly displays it (next question button); DONE
    - one is the brains (Model) the other is the View (UI)
 3. A  function to start a New Game from 0 (with a monkey button); DONE
 4. A  Function to Re-start the game from 0; DONE
 5. A  function to evaluate if the answer is correct or not. DONE
 6. A  function to count the score (add or rest) DONE
      - it adds or rest the count (Model) INPROGRESS
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
     Event Listener/ handler- VIEW
  ---------------------------------------------------------------------------------*/

  //Loading the App : 
    
  $("#game-section").hide();
  $("#logo").click(startGame);

  //Instructions and Restart buttons Always available  
  modalBoxShow();
  restart();

 // Global Variables
  var currentQuestion, 
  userScore,
  selectedChoices;

  function startGame() {
    //Render Game Section
    $("#init-page").hide();
    $("#game-section").show();

    //Render question group
    currentQuestion = 0;
    selectedChoices = [];
    userScore = [];
    renderQuestion(currentQuestion);
    renderChoices(currentQuestion);

    //Render next Question
     nextQuestion(currentQuestion);

  };
   /*---------------------------------------------------------------------------------
     FUNCTIONS 
  ---------------------------------------------------------------------------------*/
  //Function for left Instructions button 
  function modalBoxShow() {
      $("#how").click(function() {
      $("#modal").show();
    });

    $("#gotIt").click(function() {
     $("#modal").hide();
    });
  };

  //Function for Right reStart button 
  function restart() {
    $("#new").click(function() {
      //Reset the Values of HTML 
      cleanQuestion();
      currentQuestion = 0;
      //Event listeners: returning to init Page
      $("#game-section").hide();
      $("#init-page").show();
   });
  };

  //function to clean HTML
  function cleanQuestion(){
      $("#question").html('');
      $("#list-choices").html('');
      // console.clear();
  };
  //Function to Show the Question given the Current Question 
  function renderQuestion(currentQuestion) {
    var question = '<h1>' + questionOnDisplay[currentQuestion].question + '</h1>' ;
    $("#question").append(question);
    // console.log(question);
    // console.log(currentQuestion);
  };

  //Function to Show Choices given the Current Question 
  function renderChoices(currentQuestion) {
    var showChoices = "<form id='answerSelect'>";
      $.each(questionOnDisplay[currentQuestion].choices, function(index, choice) {
        if(questionOnDisplay[currentQuestion].correctAnswer.length !== 1) {
          showChoices += '<div><input class="answer answer-checkbox" type="checkbox" id="answer-'+ index +'" name="answer" value=' + index +'"><label class="answer" for="answer-'+ index +'">' + choice + '</label></div>'; 
          // console.log(choice);
        } else {
          showChoices += '<div><input class="answer answer-radio" type="radio" id="answer-'+ index +'" name="answer" value=' + index +'"><label class="answer" for="answer-'+ index +'">' + choice + '</label></div>'; 
          // console.log(choice);   
        }

      });
      showChoices += "</form>"
    $("#list-choices").append(showChoices); 
    // console.log(currentQuestion);
  };
  
  //Function to Render next-question 
  function nextQuestion(currentQuestion){
    $("#next-question").click(function(){
       getUserAnswers();
       console.log(selectedChoices);
       console.log(questionOnDisplay[currentQuestion].correctAnswer);
       answerEvaluation(currentQuestion);
       addUpScore(questionOnDisplay);
       console.log("the current Score is: " + userScore);
       // console.log(answerEvaluation);
      if(currentQuestion < questionOnDisplay.length - 1) {
          cleanQuestion();
          currentQuestion++;
          renderQuestion(currentQuestion);
          renderChoices(currentQuestion);
          console.log("the current question is: " + currentQuestion);
      } else {
        cleanQuestion();
        alert("end of game");
      }
    }); 
  };

  //Function to grab the User choices. it returns an Array
  function getUserAnswers () {
   selectedChoices = $('.answer:checked').map(function(index, checkboxOrRadio){
      return parseInt($(checkboxOrRadio).val());
   }).get();
    return selectedChoices;
  };

   //Function to evaluate selectedChoices vs Correct Choice
/*    function answerEvaluation(currentQuestion){
     if(selectedChoices === questionOnDisplay[currentQuestion].correctAnswer) {
        userScore.push(1);
     } else if(selectedChoices !== questionOnDisplay[currentQuestion].correctAnswer) {
        userScore.push(-1);
     };
     return userScore;
   };*/

   function answerEvaluation(currentQuestion){
    if(compareArrays(selectedChoices, questionOnDisplay[currentQuestion].correctAnswer)) {
      userScore.push(1);
    } else {
      userScore.push(-1);
    }
   };
   //this compares the arrays by turning them into strings. is there a better way????!! 
   function compareArrays(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
   };

   //Function to Sum all good/ rest all bad answers 
   function addUpScore(questionOnDisplay){
    return userScore.reduce(function(previousValue, currentValue, currentIndex, array){
      return previousValue + currentValue;
    });
   };

   //Function to render Progress
   function progressBar(){
    
   }
});

