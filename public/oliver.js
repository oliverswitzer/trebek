// nikliver.js


$(document).ready(function() {

  var $cards = $(".card").not(".cat-card");
  var $buttons = $("button");
  var $score1 = 0
  var $score2
  var $score3

  $cards.on("click", function(){
   var $this = $(this);
   var $value = $this.find(":first-child");
   var $question = $this.find(":nth-child(2)");
   var $answer = $this.find(":nth-child(3)");
   var $notChosen = $cards.not(this);

   //if player hasn't chosen this card already and the selected card isn't disabled
   if (!$this.hasClass("played") && !$this.hasClass("disabled")) {

    if(isVisible($value)) {   // if point value is visible
      $this.addClass("chosen"); //card is chosen
      $notChosen.addClass("disabled");    //disabled all other cards 
      $value.toggle();
      $question.toggle();
      enableButtons($value.text());
    } else if(isVisible($question)) {  //if question is visible
      $question.toggle();
      $answer.toggle();
    } else {   // if answer is visible
      $this.removeClass("chosen");
      $this.addClass("played");
      $notChosen.removeClass("disabled");
      $answer.toggle();
      $buttons.addClass("disabled");
    }

   } 
  });


  function isVisible(cardObject) {
    return cardObject.is(":visible");
  }

  function enableButtons(cardValue) {
    var cardValInt = Number(cardValue);
    var $buttons = $("button");   // must get all buttons again because this function doesn't have access to the scope in which I first defined $buttons
    $buttons.removeClass("disabled");
    $buttons.on("click", function() {
      var $this = $(this);
      var $scoreContainer = $this.parent().children().filter("h2");
      var score = Number($scoreContainer.text());

      if(!$this.hasClass("disabled")) {  // if this button isn't disabled
        if($this.hasClass("up")) {   //if user is clicking on an up button
          score += cardValInt;     //increment the score by the value of the card
          $scoreContainer.text(String(score));   //set the container text to the score
          $buttons.addClass("disabled")
        } else  {  //if button clicked is down
          score -= cardValue;    // subtract card value from score
          $scoreContainer.text(String(score)); //set the container text to the score
          $buttons.addClass("disabled");
        }
      }
      
    });
  }


});

