$(function(){
    //儲存目前作答到第幾題
    let currentQuiz = null;
    //按下按鈕後要做的事
    $("#startButton").on("click",function(){
        //console.log("Hello");
        if(currentQuiz == null){
            currentQuiz = 0;
            $("#options").empty();
            $("#question").text(questions[0].question);
            questions[0].answers.forEach(function(element,index,array){
                $("#options").append(`<input name='options' type='radio' value='${index}'> <label>${element[0]}</label><br><br>`);
            });
            //將按鈕的字改成next
            $("#startButton").attr("value","Next");
        }
        else{
            $.each($(":radio"),function(i,val){
                //console.log(i + ":" + val.checked );
                //checked代表選到他
                if(val.checked){
                    //is not a number : a->true
                    if(isNaN(questions[currentQuiz].answers[i][1])){
                        //結果是a\b\c\d
                        let finalResult = questions[currentQuiz].answers[i][1];
                        //顯示最終結果的標題
                        $("#question").text(finalAnswers[finalResult][0]);
                        //將選項區域清空
                        $("#options").empty();
                        //顯示最終結果內容
                        $("#options").append(`${finalAnswers[finalResult][1]}<br><br>`);
                        currentQuiz = null;
                        $("#startButton").attr("value","重新開始");
                    }
                    else{
                        //go to q[i]
                        currentQuiz = questions[currentQuiz].answers[i][1]-1;
                        //顯示新的題目
                        $("#question").text(questions[currentQuiz].question);
                        $("#options").empty();
                        questions[currentQuiz].answers.forEach(function(element,index,array)
                        {
                            $("#options").append(`<input name='options'type='radio'value='${index}'>
                            <label>${element[0]}</label><br><br>`);
                        });
                    }
                    return false;
                }
            });
        }
    });
});