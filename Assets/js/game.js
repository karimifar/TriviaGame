
    var questions = {
        q1: {
            question: "What is a type family?",
            options: ["A designer’s collection of favorite typefaces.","Typefaces in the same type category, such as slab serif.","Any group of typefaces that work well together.","Typefaces that are variations of each other and designed to work together."],
            choice: 3,
            questionImage: "Assets/images/q4.JPG",
            answerText: "A type family is a range of typeface designs that are variations of one basic style of alphabet. There are hundreds – maybe thousands – of typeface families.",
            answerImage: "Assets/images/a1.png",
            
        },
        q2: {
            question: "Name the part of the letterform.",
            options: ["Stroke Axis","Crossbar","Descender","Baseline"],
            choice: 1,
            questionImage: "Assets/images/q1.png",
            answerText: "The (usually) horizontal stroke across the middle of uppercase A and H is a crossbar.",
            answerImage: "Assets/images/a2.png",
        },
        q3: {
            question: "Which of the following would be the best way to improve the readability of this paragraph?",
            options: ["More space between letters.","More space between words.","More space between lines.","Make the typeface bolder."],
            choice: 2,
            questionImage: "Assets/images/q2.png",
            answerText: "Line spacing, or “leading”, is the amount of space between the baselines of each line of text. Correct leading is important because it gives multiple lines of text optimum legibility.",
            answerImage: "Assets/images/a3.png",
        },
        q4: {
            question: "Garamound is part of which font category?",
            options: ["Oldstyle","Slab Serif","Sans Serif","Script"],
            choice: 0,
            questionImage: "Assets/images/q3.png",
            answerText: "Garamond is a group of many old-style serif typefaces, named for sixteenth-century Parisian engraver Claude Garamond (generally spelled as Garamont in his lifetime)",
            answerImage: "Assets/images/a4.png",
        },
        q5: {
            question: "A serif typeface",
            options: ["has an extra brush stroke at the end of the letter.","has no thick/thin relationship.","does not have an extra brush stroke at the end of the letter.","B & C"],
            choice: 0,
            questionImage: "Assets/images/q6.jpg",
            answerText: "Serifs fall into various groups and can be generally described as hairline (hair), square (slab), or wedge and are either bracketed or unbracketed.",
            answerImage: "Assets/images/a6.png",
        },
        q6: {
            question: "Name the part of the letterform.",
            options: ["Bowl","Eye","Aperture","Counter"],
            choice: 0,
            questionImage: "Assets/images/q5.png",
            answerText: "In typography, the curved part of the character that encloses the circular or curved parts (counter) of some letters such as d, b, o, D, and B is the bowl.",
            answerImage: "",
        },
    }

    //current question
    var time;
    var correct= 0;
    var wrong= 0;
    var unanswered= 0;
    var c= 0;
    var main = $(document);
    var every30;
    var timer;
    var chosen;
    var timerRun = false;

    var weirdRunning = false;
    //clear html blocks for new stuff
    function clearHtml(){
        $("#question").html("");
        $("#question-image").html("");
        $("#options").html("");
        $("#answer-text").html("");
        $("#timer").html("");
        $("#answer-image").html("");
    }

    //write next question in the div
    function writeQ(){
        c++
        if (c>6){
            endGame();
            
        }else{
        $("#question").html("<p class='questions'>" + questions['q'+c].question + "</p>")
        
        $("#question-image").html("<img src="+questions['q'+c].questionImage+">");

        $("#options").html("");
        for (i=0; i<questions['q'+c].options.length; i++){
            $("#options").append("<li class='options clickNext'>"+questions['q'+c].options[i]+"</li>") 
        }
    }
    }

    //show answer and the image
    function answerCard(){
        clearHtml();
        clearInterval(timer)
        $("#answer-text").html("<p class='correct-text'>" + questions['q'+c].answerText + "</p>" )
        $("#answer-image").html("<img src=" + questions['q'+c].answerImage + ">")
    }


    //when a choice is clicked
    $("#options").on("click","li", function(){
        chosen = questions['q'+c].options.indexOf($(this).text());
        clearHtml();
        
        clearInterval(timer);
        answerCard();
        checkWin();
        setTimeout(function (){
            clearHtml();
            writeQ();
            showTimer();
        }, 5000);
        writeStats();
    })


    function startGame(){
        writeStats();
        writeQ();
        showTimer();
        $("#stats").attr("class", "visible")
    }

    $("#start-button").on("click", startGame)

    var time;
    function showTimer(){
        if (!timerRun){
        time=20;
        $("#timer").text(time);
        
        timer = setInterval(function(){
        if (time>0){
        time--;
        console.log("Timer interval running");
        $("#timer").text(time);}
        else{
            checkUnanswered();
            console.log("Timer interval STOPPED");
            clearInterval(timer)
        }}, 1000)
        }}

    function checkUnanswered(){ 
            unanswered ++;
            answerCard();
            $("#answer-text").prepend("<h1 class='timeup'> Time's up!</h1>");     
            setTimeout(function nextQ(){
                clearHtml();
                writeQ();
                showTimer();
            }, 5000);
            writeStats();
    }
    // debugger;

    //add to correct or wrong if the answer is so
    function checkWin(){
        if (questions['q'+c].choice === chosen){
            $("#answer-text").prepend("<h1 class='right'> CORRECT!</h1>")
            correct++;
        } else{ 
            wrong++;
            $("#answer-text").prepend("<h1 class='wrong'> Nope!</h1>")
        }

    }

    function writeStats(){
        $("#correct").text("Corrrect: " + correct)
        $("#wrong").text("Wrong: " + wrong)
        $("#unanswered").text("Unanswered: " + unanswered)
    }

    function endGame(){
        $("#reset").html("")
        clearHtml();
        var finalText = $("#final")
        $("#reset").html("<button class= 'final btn resetBtn'> Try Again</button>")
        $("#stats").attr("class", "invisible");
        $("#fcorrect").text(correct);
        $("#fwrong").text(wrong);
        $("#funanswered").text(unanswered);

        finalText.attr("class", "visible")
        var final = new TimelineMax();
        final.staggerFrom(".final", 1, {opacity:0, transformOrigin:"50% 50%", ease:Power1.easeOut }, 0.3)
    }

    function reset(){
        c =0;
        unanswered=0;
        wrong=0;
        correct=0;
    }


    $(document).on("click", ".resetBtn", function(){
        clearInterval(timer);
        $("#stats").attr("class", "visible");
        reset();
        startGame();
        $("#final").attr("class", "invisible")
        $("#reset").attr("class", "invisible")
    })