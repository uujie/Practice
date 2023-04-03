$(function(){
    $("#courseTable").append("<tr><th>場次</th><th>時間</th><th>主題</th></tr>");
    let topicCount = topic.length;
    let millisecsPerDay = 24*60*60*1000;
    for( let x = 0; x < topicCount; x++ ){
        $("#courseTable").append(
            "<tr>"+
            `<td>${x+1}</td>`+
            //轉成年月日
            `<td>${(new Date(startDate.getTime()+7*x*millisecsPerDay)).toLocaleDateString(undefined, { month: '2-digit', day: '2-digit' })}</td>`+
            `<td>${topic[x]}</td>`+
            "</tr>");
    }
});