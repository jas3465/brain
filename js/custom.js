var idx = 0;

var colors = ['#F2326B','#FDC131','#23D2BE','#178ACD'];

var newEntity = 3;

function setColor(entityId) {
  document.getElementById(entityId).style.backgroundColor = colors[++idx%4];
};

function initialize() {
  $("#editor")
    .append("<div id='circle'>test</div>");

  $("#circle")
    .addClass("circle");

    document.getElementById("circle").style.backgroundColor = setColor("circle");

};

$("#location").click(function () {

  var entityId = "circle" + newEntity++;

  $("#editor")
    .append("<div id='" + entityId + "'>Location</div>");

  $("#" + entityId).addClass("circle3");

  document.getElementById(entityId).style.backgroundColor = setColor(entityId);

  jsPlumb.draggable(entityId);
});