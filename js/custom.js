var idx = 0;
var newEntity = 0;

function initialize() {

};

var colors = ['#F2326B','#FDC131','#23D2BE','#178ACD'];
function setColor(entityId) {
  document.getElementById(entityId).style.backgroundColor = colors[++idx%4];
};



$(".types li").click(function () {

  var entityId = "location" + newEntity++;

  $("#editor")
    .append("<div id='" + entityId + "'></div>");

  $("#" + entityId).addClass("circle");

  document.getElementById(entityId).style.backgroundColor = setColor(entityId);

  jsPlumb.draggable(entityId);
});
