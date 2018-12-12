var idx = 0;
var newEntity = 0;
var x_pos = 60;
var y_pos = 60;

function initialize() {

};

var colors = ['#F2326B','#FDC131','#23D2BE','#178ACD'];
function setColor(entityId) {
  document.getElementById(entityId).style.backgroundColor = colors[++idx%4];
};



$("#types li").click(function () {

  var entityId = "location" + newEntity++;
  var type = $(this).attr('id');
  $("#editor")
    .append("<div id='" + entityId + "'><span>" + type + "</span></div>");

  $("#" + entityId).addClass("entity");

  var d = document.getElementById(entityId);

  d.style.backgroundColor = setColor(entityId);
  d.style.left = x_pos+'px';
  d.style.top = y_pos+'px';

  x_pos = x_pos + 100;
  v_pos = v_pos + 100;  

  jsPlumb.draggable(entityId);
});
