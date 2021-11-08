const HEADS = 5
const HEAD = ["№ Поста", "Тип происшествия", "Описание", "Время фиксации", "Время устранения"];
const COLUMN_WIDTH = ["width: 10%", "width: 20%", "width: 40%", "width: 15%", "width: 15%"]
const COUNT_HISTORY_LINES = 10



function show_events(jsonEvents) {
  let eventsDiv = document.createElement("div");
  eventsDiv.id = "eventdiv";
  eventsDiv.className = "eventDiv";
  document.body.append(eventsDiv);

  let eventsTable = document.createElement("table");
  eventsTable.className = "eventsTable";
  eventsDiv.append(eventsTable);

  let eventsHead = document.createElement("thead");
  eventsHead.className = "eventsHead";
  eventsTable.append(eventsHead);

  let eventsHeadRow = document.createElement("tr");
  eventsHeadRow.className = "eventsHeadRow";
  eventsHead.append(eventsHeadRow);

  for (let i = 0; i < HEADS; i++) {
    let eventsHeadNum = document.createElement("td");
    eventsHeadNum.id = "evnetsHeadNum" + i;
    eventsHeadNum.className = "eventsHeadTd";
    eventsHeadNum.style = COLUMN_WIDTH[i];
    eventsHeadNum.innerHTML = HEAD[i];
    eventsHeadRow.append(eventsHeadNum);
  }

  let eventsTBody = document.createElement("tbody");
  eventsTBody.className = "eventsTBody";
  eventsTable.append(eventsTBody);

  let eventTypesJson;
  $.ajax({
    url: "http://127.0.0.1:8000/main/EventsTypes/?format=json",
    method: "get",
    dataType: "json",
    async: false,
    success: function(data) {
      eventTypesJson = data
    }
  });

  for (let i = 0; i < COUNT_HISTORY_LINES; i++) {
    let eventsBodyRowNum = document.createElement("tr");
    eventsBodyRowNum.id =  "eventsBodyRowNum" + i;
    eventsTBody.append(eventsBodyRowNum);

   
    eventsBodyRowNum.className = "eventsBodyRowOdd";

    let postNum = document.createElement("td");
    postNum.innerHTML = i;
    postNum.className = "eventsTd";
    postNum.id = "post" + i;
    eventsBodyRowNum.append(postNum);

    let typeEvent = document.createElement("td");   
    typeEvent.id = "type_event" + i; 
    typeEvent.className = "typeEvent";
    typeEvent.innerHTML = eventTypesJson[0].eventtype;
    
    eventsBodyRowNum.append(typeEvent);

    let descriptionAddButton = document.createElement("button");
    descriptionAddButton.innerHTML = jsonEvents[i].eventdescription;
    descriptionAddButton.innerHTML = "Test description only";
    descriptionAddButton.id = "desc" + i;
    descriptionAddButton.className = "descriptionButton";
    // descriptionAddButton.formTarget = "blank";
    descriptionAddButton.onclick = function() {openEditing(i, jsonEvents[i].id)};

    let frameButton = document.createElement("td");
    frameButton.append(descriptionAddButton);
    eventsBodyRowNum.append(frameButton);

    let timeDetection = document.createElement("td");
    timeDetection.innerHTML = jsonEvents[i].detectingtime;
    timeDetection.className = "eventsTd";
    timeDetection.id = "detect" + i;
    eventsBodyRowNum.append(timeDetection);

    let timeFixing = document.createElement("td");
    timeFixing.innerHTML = jsonEvents[i].fixingtime;
    timeFixing.className = "eventsTd";
    timeFixing.id = "fix" + i;
    eventsBodyRowNum.append(timeFixing);
  }
}

function custom_sort(b, a) {
  return new Date(a.timedetecting).getTime() - new Date(b.timedetecting).getTime();
}

function wrap() {
  $.ajax({
    url: "http://127.0.0.1:8000/main/Events/?format=json",
    method: "get",
    dataType: "json",
    async: false,
    success: function(data){
        // let jsonRes = data.sort(((obj1, obj2) => -(obj2.detectingtime - obj1.detectingtime)));
        // console.log(jsonRes);
        
        // jsonRes = data.sort(custom_sort);
        jsonRes = data.slice(data.length - 15, data.length);

        show_events(jsonRes);
    }
  });
}

wrap();


function openEditing(i, id_clicked) {
    localStorage.setItem("post" + id_clicked, document.getElementById("post" + i).innerHTML);
    localStorage.setItem("detect" + id_clicked, document.getElementById("detect" + i).innerHTML);
    localStorage.setItem("fix" + id_clicked, document.getElementById("fix" + i).innerHTML);
    localStorage.setItem("desc" + id_clicked, document.getElementById("desc" + i).innerHTML);


    // window.load
    window.name = "edit/" + id_clicked;

    window.open(window.name, '_blank');
}


