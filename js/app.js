"use strict"; 
$(document).ready(function() {
  
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
      "How do you say “I’m hungover” in spanish?",
      ["Estoy crudo!","Estoy bien, gracias!"],
      [0]
    );
    questionOnDisplay[2] = new Question (
      "Select the option that translates to Spanish and in the same order the following list: “1. Blue, 2. Red, 3. Yellow”:",
      ["1. Morado, 2. Blanco, 3. Gris", "1.Verde, 2. Rojo, 3. Rosa", "1. Negro, 2. Amarillo, 3. Verde", "1. Azul, 2.  Rojo, 3. Amarillo"],
      [3]
    );
    questionOnDisplay[3] = new Question (
      "Is “mono” a way to say “monkey” in Spanish?",
      ["yes", "no"],
      [0]
    );     
    questionOnDisplay[4] = new Question (
      "How do you ask: “where is the toilet?” in spanish?",
      ["¿Dónde está la cocina?", "¿Dónde está el baño?", "¿Dónde está el teléfono?"],
      [1]
    );         
    questionOnDisplay[5] = new Question (
      "Select the 2 correct ways to say “I love you” in Spanish:",
      ["te aprecio", "te amo", "te quiero","me gustas"],
      [1, 2]
    );
     questionOnDisplay[6] = new Question (
      "Is “Lunes” a:",
      ["Day of the week", "Mexican Actor", "Moon in spanish"],
      [0]
    );  
     questionOnDisplay[7] = new Question (
      "Dog is to “perro” as cat is to “gato”:",
      ["yes", "no"],
      [0]
    );   
     questionOnDisplay[8] = new Question (
      "Select the numerical option that translates: “uno, diez, cinco”:",
      ["2, 4, 6","1, 10, 5", "1, 12, 7"],
      [1]
    ); 
     questionOnDisplay[9] = new Question (
      "How do you say “I like programming!” in spanish:",
      ["Me gusta programar!", "Me gusta comer!"],
      [0]
    );      


   /*---------------------------------------------------------------------------------
     Event Listeners/ handlers
  ---------------------------------------------------------------------------------*/

  //Loading the App : 
    
  $("#game-section").hide();
  $("#statusWrapper").hide();
  $("#logo").click(startGame);

  //Instructions and Restart buttons Always available  
  modalBoxShow();
  restart();

 // Global Variables
  var currentQuestion;
  var userScore;
  var selectedChoices;

  function startGame() {
    //Render Game Section
    $("#init-page").hide();
    $("#endGame").hide();
    $("#statusWrapper").show();
    $("#game-section").show();

    //Render question group
    currentQuestion = 0;
    selectedChoices = [];
    userScore = [0];
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
      userScore = [0];
      $("#status").attr('style', progressBar(userScore));
      startGame();
   });
  };

  //function to clean HTML
  function cleanQuestion(){
      $("#question").html('');
      $("#list-choices").html('');
  };
  //Function to Show the Question given the Current Question 
  function renderQuestion(currentQuestion) {
    var question = '<h1>' + questionOnDisplay[currentQuestion].question + '</h1>' ;
    $("#question").append(question);
  };

  //Function to Show Choices given the Current Question 
  function renderChoices(currentQuestion) {
    var showChoices = "<form id='answerSelect'>";
      $.each(questionOnDisplay[currentQuestion].choices, function(index, choice) {
        if(questionOnDisplay[currentQuestion].correctAnswer.length !== 1) {
          showChoices += '<div><input class="answer answer-checkbox" type="checkbox" id="answer-'+ index +'" name="answer" value=' + index +'"><label class="answer" for="answer-'+ index +'">' + choice + '</label></div>'; 
        } else {
          showChoices += '<div><input class="answer answer-radio" type="radio" id="answer-'+ index +'" name="answer" value=' + index +'"><label class="answer" for="answer-'+ index +'">' + choice + '</label></div>'; 
        }
      });
      showChoices += "</form>"
    $("#list-choices").append(showChoices); 
  };
  
  //Function to Render next-question 
  function nextQuestion(currentQuestion){
    $("#next-question").click(function(){
       getUserAnswers();
       console.log("the user choices are : " + selectedChoices);
       console.log("The correct answer is: "+ questionOnDisplay[currentQuestion].correctAnswer);
       answerEvaluation(currentQuestion);
       console.log("the current Score is: " + userScore);
      $("#status").attr('style', progressBar(userScore));
      if(currentQuestion < questionOnDisplay.length - 1) {
          cleanQuestion();
          currentQuestion++;
          renderQuestion(currentQuestion);
          renderChoices(currentQuestion);
          console.log("the current question is: " + currentQuestion);
          if(userScore === 5){
            endGame(userScore);
          };
      } else {
        cleanQuestion();
        endGame(userScore);
      }
    }); 
  };

  //Function to grab the User choices. it returns an Array
  function getUserAnswers () {
   selectedChoices = $('.answer:checked').map(function(index, checkboxOrRadio){
    return parseInt($(checkboxOrRadio).val());
   }).get();
   console.log(selectedChoices);
    return selectedChoices;
  };

   //Function to evaluate selectedChoices vs Correct Choice
   function answerEvaluation(currentQuestion){
    if(compareArrays(selectedChoices, questionOnDisplay[currentQuestion].correctAnswer)) {
      userScore++;
    } else {
      if (userScore > 0) {
        userScore--;
      }
    }
    return userScore;
   };
   //This compares the arrays by turning them into strings. is there a better way????!! 
   function compareArrays(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
   };

   // Function to render Progress
   function progressBar(userScore){
    var showScore = 'width: ';
    showScore += (userScore * 100)/ 5;
    showScore += "%"; 
    return showScore;
   };

   //function to End game! 
   function endGame(userScore){
      $("#statusWrapper").hide();
      $("#game-section").hide();
      $("#endGame").show();
     if(userScore === 5) {
      var endMessage = '<div class="message">Congratulations! The Monkey Survived and now he is a happy Monkey!</div>';
      $("#endGame").append(endMessage);
     } else {
      endMessage = '<div class="message">Ups! Monkey is hungry and angry!</div>';
      $("#endGame").append(endMessage);
     }
   };
});

