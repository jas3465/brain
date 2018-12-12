var idx = 0;

var colors = ['#F2326B','#FDC131','#23D2BE','#178ACD'];

var newEntity = 0;

function setColor(entityId) {
  document.getElementById(entityId).style.backgroundColor = colors[++idx%4];
};

function initialize() {

};

$("#location").click(function () {

  var entityId = "circle" + newEntity++;

  $("#editor")
    .append("<div id='" + entityId + "'></div>");

  $("#" + entityId).addClass("circle");

  document.getElementById(entityId).style.backgroundColor = setColor(entityId);

  jsPlumb.draggable(entityId);
});