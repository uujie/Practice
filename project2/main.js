$(function(){
    $("#courseTable").append("<tr><th>場次</th><th>時間</th><th>主題</th></tr>");
    let topicCount = topic.length;
    let millisecsPerDay = 24*60*60*1000;
    let courses = [];
    for(let x = 0; x < topicCount; x++) {
        courses.push({
            topic: topic[x],
            date: new Date(startDate.getTime() + 7 * x * millisecsPerDay),
            order: x + 1
        });
    }
    courses.sort(function(a, b) {
        return a.date.getTime() - b.date.getTime();
    });
    for(let x = 0; x < courses.length; x++) {
        let course = courses[x];
        $("#courseTable").append(
            "<tr>"+
            `<td>${course.order}</td>`+
            `<td>${course.date.toLocaleDateString(undefined, { month: '2-digit', day: '2-digit' })}</td>`+
            `<td>${course.topic}</td>`+
            "</tr>"
        );
    }
  
    $("#addBtn").click(function(){
        let topic = $("#topic").val();
        let date = new Date($("#date").val());
        
        // 判斷主題和日期是否為空
        if (topic.trim() === "" || isNaN(date.getTime())) {
            alert("主題或日期不得為空");
            return;
        }
        
        let dateString = date.toLocaleDateString(undefined, { month: '2-digit', day: '2-digit' });
        let rowCount = $("#courseTable tr").length;
        let order = rowCount; // 不算表頭
        let isGray = $("#colorCheckbox").is(":checked"); // 是否變紅色
        let cssClass = isGray ? "gray" : "default";
        let rowHtml = `<tr class="${cssClass}">`+
                        `<td>${order}</td>`+
                        `<td>${dateString}</td>`+
                        `<td>${topic}</td>`+
                      "</tr>";
        $("#courseTable").append(rowHtml);
    
        // 新增後重新排序
        courses.push({
            topic: topic,
            date: date,
            order: order,
            isHoliday: isHoliday // 紀錄是否為特殊日期
        });
        courses.sort(function(a, b) {
            return a.date.getTime() - b.date.getTime();
        });
        for(let x = 0; x < courses.length; x++) {
            courses[x].order = x + 1;
            let row = $("#courseTable tr").eq(x + 1);
            row.removeClass().addClass(courses[x].isHoliday ? "gray" : "");
            row.find("td").eq(0).text(courses[x].order);
            row.find("td").eq(1).text(courses[x].date.toLocaleDateString(undefined, { month: '2-digit', day: '2-digit' }));
            row.find("td").eq(2).text(courses[x].topic);
        }
      
    });
    
    
    
});
