let mapArray, ctx, currentImgMain;
let imgMountain, imgMain, imgEnemy; //image 物件
//就是個常數
const gridLength = 200;

function loadImages(sources, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    // get num of sources
    for (var src in sources) {
        numImages++;
    }
    for (var src in sources) {
        images[src] = new Image();
        images[src].onload = function () {
            if (++loadedImages >= numImages) {
                callback(images);
            }
        };
        images[src].src = sources[src];
    }
}

$(function(){
    mapArray = [
        //0-可走,1-障礙,2-終點,3-敵人
        [0,1,1,0],
        [0,0,0,3],
        [3,0,1,0],
        [1,0,0,2]
    ];
    ctx = $("#myCanvas")[0].getContext("2d");
    //先new出來
    imgMain = new Image();
    //再指定到圖片
    imgMain.src = "images/spriteSheet.png";
    currentImgMain = {
        //單純的一個字可以不加雙引號或引號
        "x":0,
        "y":0
    };
    //等到圖片真的載進來再執行
    imgMain.onload = function(){
        //80*130可以剛好剪到第一個人
        ctx.drawImage(imgMain,0,0,80,130,currentImgMain.x,currentImgMain.y,gridLength,gridLength);
    };

    let sources = {
        //改成自己的照片
        mountain: "images/material.png",
        enemy: "images/Enemy.png"
    };
    loadImages(sources, function(images){
        for (let x in mapArray) {
            for (let y in mapArray[x]) {
                if (mapArray[x][y] == 1) {
                    ctx.drawImage(images.mountain, 288, 192, 32, 32, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 3) {
                    ctx.drawImage(images.enemy, 490, 40, 70, 135, y * gridLength, x * gridLength, gridLength, gridLength);
                }
            }
        }
    });
});

//使用者開始按按鈕後觸發 並把相關物件傳進去
$(document).on("keydown", function(event){
    console.log(event.key);                    //測試是否有吃到資料
    let targetImg, targetBlock, cutImagePositionx;
    //cutImagePositionx決定主角的臉朝哪一個方向
    targetImg = {
        //主角的目標座標
        "x":-1,
        "y":-1
    }
    targetBlock = {
        "x":-1,
        "y":-1
    }
    event.preventDefault();
    //避免鍵盤預設行為發生

    switch(event.code){
        case "ArrowLeft":
            targetImg.x = currentImgMain.x - gridLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionx = 175;//臉朝左
            break;
        case "ArrowUp":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y - gridLength;
            cutImagePositionx = 355;//臉朝上
            break;
        case "ArrowRight":
            targetImg.x = currentImgMain.x + gridLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionx = 540;//臉朝右
            break;
        case "ArrowDown":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y + gridLength;
            cutImagePositionx = 0;//臉朝下
            break;
        default:
            return;
    }
    //確認目標位置不會超過地圖
    if(targetImg.x<=600 && targetImg.x>=0 && targetImg.y<=600 && targetImg.y>=0){
        targetBlock.x = targetImg.y / gridLength;
        targetBlock.y = targetImg.x / gridLength;
    }
    else{
        targetBlock.x = -1;
        targetBlock.y = -1;
    }
    //清空主角原本所在位置
    ctx.clearRect(currentImgMain.x, currentImgMain.y, gridLength, gridLength);

    if(targetBlock.x != -1 && targetBlock.y != -1){
        switch(mapArray[targetBlock.x][targetBlock.y]){
            case 0: //一般道路 可移動
                $("#talkBox").text("");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 1: //有障礙物 不可移動
                $("#talkBox").text("有山");
                break;
            case 2: //終點 可移動
                $("#talkBox").text("抵達終點");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 3: //敵人 不可移動
                $("#talkBox").text("Hello有敵人");
                break;
        }
    }
    else{
        $("#talkBox").text("邊界")
    }

    //重新繪製主角
    ctx.drawImage(imgMain,cutImagePositionx,0,80,130,currentImgMain.x,currentImgMain.y,gridLength,gridLength);
});