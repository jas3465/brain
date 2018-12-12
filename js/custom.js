var idx = 0;
var newEntity = 0;
var x_pos = 300;
var y_pos = 250;

function initialize() {

};

var colors = ['#F2326B','#FDC131','#23D2BE','#178ACD'];
function setColor(entityId) {
  document.getElementById(entityId).style.backgroundColor = colors[++idx%4];
};



$("#types li").one("click", function () {

  var type = $(this).attr('id');
  if (type == "location" || type == "restaurant" || type == "atm" || type == "healthcareFacility" || type == "healthcareProfessional" || type == "event"){
    var entityId = type + newEntity++;
    $(this).append("<img src='check.png' class='check'/>");   }
  else
    var entityId = "custom" + newEntity++;
  
  $("#editor")
    .append("<div id='" + entityId + "'><span>" + type + "</span></div>");

  $("#" + entityId).addClass("entity");

  var d = document.getElementById(entityId);

  d.style.backgroundColor = setColor(entityId);
  d.style.left = x_pos+'px';
  d.style.top = y_pos+'px';

  x_pos = x_pos + 200;
  y_pos = y_pos + 200;  

  jsPlumb.draggable(entityId);
});
