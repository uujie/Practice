//window.onload = function(){
    //alert("hi");會彈出視窗
//};
let imageURLArray = [
    "https://d1grca2t3zpuug.cloudfront.net/2021/09/tramen01.jpg",
    "https://sweetamy.tw/wp-content/uploads/2021/08/IMG20210721122959-1-scaled.jpg",
    "https://etaiwan.blog/wp-content/uploads/20210718030122_58.jpg",
    "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/5802fab5-fdce-468a-a830-43e8001f5a72/Derivates/c00dc34a-e73d-42f0-a86e-e2fd967d33fe.jpg"
];

var prev = -1;
//網頁載進來後馬上會執行
//初始化
$(function(){
    //點了任何input之後會出現的東西
    $("input").on("click",function(){
        //alert("Hi");
        //把標題的?改成
        //hello
        //$("h1").text("Hello");
        //清單裡的第幾個文字 從0開始
        //可以用console來測試
        var numOfListItem = $("li").length;
        //目前長度 = 3
        //0~1(0.999999999) -> 0~3 實際是0~2.多
        var Random = Math.floor(Math.random()*numOfListItem);
        while( Random == prev )
            Random = Math.floor(Math.random()*numOfListItem);
        //把Random印在console上
        console.log(Random);
        $("h1").text($("li").eq(Random).text());
        //change picture
        $("img").attr("src",imageURLArray[Random]);
        prev = Random;
    });
});