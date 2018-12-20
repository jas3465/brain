/* GLOBAL VARIABLES */

var idx = 0;
var newEntity = 0;
const entityTypes = {
  location: "Location",
  atm: "ATM",
  restaurant: "Restaurant",
  healthcareProfessional: "Healthcare Professional",
  healthcareFacility: "Healthcare Facility",
  event: "Event",
  custom: "Custom"
};
var dynamicAnchors = [[0.2, 0, 0, -1], [1, 0.2, 1, 0],
[0.8, 1, 0, 1], [0, 0.8, -1, 0]];

var typesEnabled = {
  location: false,
  atm: false,
  restaurant: false,
  healthcareProfessional: false,
  healthcareFacility: false,
  event: false
}

function initialize() {

};

jsPlumb.ready(function () {
  var instance = jsPlumb.getInstance({
    Container: "editor",
    Connector: ["Bezier", { curviness: 30 }],
    DragOptions: { cursor: "pointer", zIndex: 2000 },
    Endpoint: "Blank",
    Anchor: ["Perimeter", { shape: "Rectangle" }],
    ConnectionOverlays: [
      ["Arrow", {
        location: 1,
        visible: true,
        width: 11,
        length: 11
      }]
    ],
  });

  instance.bind("click", function (conn) {
    instance.deleteConnection(conn);
  });

  instance.bind("beforeDrop", function (info) {
    // console.log("before drop: " + info.sourceId + ", " + info.targetId);
    if (info.sourceId === info.targetId) { //source and target ID's are same
      console.log("source and target ID's are the same - self connections not allowed.")
      return false;
    } else {
      return true;
    }
  });

  var colors = ['#F2326B', '#FDC131', '#23D2BE', '#178ACD'];
  function setColor(entityId) {
    document.getElementById(entityId).style.backgroundColor = colors[++idx % 4];
  };


  $("#types .builtin").live("click", function () {
    var node = this;
    var type = $(node).attr('id');
    addRemoveNode(type, node, false);
  });

  $("#types .customtype").live("click", function () {
    var node = this;
    var type = $(node).attr('id');
    addRemoveNode(type, node, true);
  });
    
  function addRemoveNode(type, node, isCustomType) {
    var enabled = typesEnabled[type];
    if (enabled) {
      if (isCustomType) {
        var pageContainer = $(node).parent().parent().parent();
        var nodeID = type + "Node";
        var nodeToDelete = pageContainer.children("#editor").children("#" + nodeID);
        nodeToDelete.remove();
        $(node).remove();
        typesEnabled[type] = false;
      }
      else {
        var pageContainer = $(node).parent().parent().parent();
        var nodeID = type + "Node";
        var nodeToDelete = pageContainer.children("#editor").children("#" + nodeID);
        nodeToDelete.remove();
        $(node).children(".check").remove();
        typesEnabled[type] = false;
      }
    }
    else {
      var typeName = type;
      console.log(typeName)
      console.log(isCustomType)
      console.log(type)
      if (!isCustomType) typeName = entityTypes[type];
      $(node).append("<img src='check.png' class='check'/>");
      var entityId = type + "Node";
      console.log(type)
      console.log(typeName)
      console.log(entityId)
      $("#editor").append("<div id='" + entityId + "'><span>" + typeName + "</span><div class='icons'><img class='connection' id='connection1' src='connection.png'/>&ensp;<img class='trash' src='trash.png'/>&ensp;<img class='pencil' src='pencil.png'/></div></div>");

      $("#" + entityId).addClass("entity");

      var d = document.getElementById(entityId);
      var x_pos = 260 + Math.floor(Math.random() * 740);
      var y_pos = 25 + Math.floor(Math.random() * 510);

      d.style.backgroundColor = setColor(entityId);
      d.style.left = x_pos + 'px';
      d.style.top = y_pos + 'px';

      x_pos = x_pos + 200;
      y_pos = y_pos + 200;

      instance.draggable(entityId);
      instance.makeSource(entityId);
      instance.makeTarget(entityId);
      instance.toggleSourceEnabled(entityId);
      typesEnabled[type] = true;
    }
  };

  $(".connection").live("click", function () {
    var img1 = "connection.png",
      img2 = "activeconnection.png";

    var id = $(this).parent().parent().attr("id");
    var selector = instance.getSelector("#" + id);
    var enabled = instance.toggleSourceEnabled(selector);
    var drag = instance.toggleDraggable(selector);

    /* enable source */
    if ($(this).attr("src") === img1) {
      $(this).attr("src", img2);
      $(this).parent().css("display", "block");
    }

    /* disable source */
    else {
      $(this).attr("src", img1);
      $(this).parent().css("display", "");
      instance.draggable(selector, { disabled: false });
    }

  });


  $(".pencil").live("click", function () {
    var entityType = $(this).parent().parent().text().trim();
    var settings = {};
    settings.name = entityType;
    settings.content = buildTable(entityType);
    settings.color = $(this).parent().parent().css('background-color');
    modal.open(settings);
  });

  $("#addCustom").live("click", function () {

    var settings = {};
    settings.name = "Add New Custom Type";
    settings.color = colors[++idx % 4];
    settings.content = "<span id='nameSpan'>Name: &nbsp;</span><input type='text' name='name' id='newCustomName'><br><button id='addNewTypeName'>Add</button>"
    modal.open(settings);
  });

  $('#addNewTypeName').live("click", function () {
    var newType = document.getElementById('newCustomName').value;
    console.log(newType)
    modal.close();
    typesEnabled[newType] = false;
    var node = $("<li id=" + newType + " class='customtype'>" + newType + "&emsp;</li>").insertBefore("#addCustomLink")
    addRemoveNode(newType, node, true);
  });


  $(".trash").live("dblclick", function () {
    var nodeToDelete = $(this).parent().parent();
    var nodeID = $(nodeToDelete).attr("id");
    var pageContainer = nodeToDelete.parent().parent();
    var type = nodeID.substring(0, nodeID.length - 4);
    var node = pageContainer.children("#ribbon").children("#types").children("#" + type);

    var typeClass = $(node).attr("class");
    var isCustomType = false;
    if (typeClass != "builtin") isCustomType = true;
    addRemoveNode(type, node, isCustomType);
  });

  var modal = (function () {
    var
      method = {},
      $overlay,
      $modal,
      $content,
      $close;

    $overlay = $('<div id="overlay"></div>');
    $modal = $('<div id="modal"><img class="close" src="close.png"/></div>');
    $content = $('<div id="content"></div>');
    $close = $('<a id="close" href="#"></a>');

    $modal.hide();
    $overlay.hide();
    $modal.append($content, $close);

    $(document).ready(function () {
      $('body').append($overlay, $modal);
    });

    // Center the modal in the viewport
    method.center = function () {
      var top, left;

      top = Math.max($(window).height() - $modal.outerHeight(), 0) / 2;
      left = Math.max($(window).width() - $modal.outerWidth(), 0) / 2;

      $modal.css({
        top: top + $(window).scrollTop(),
        left: left + $(window).scrollLeft()
      });
    };

    // Open the modal
    method.open = function (settings) {
      if ($('.modalHeader').length === 0) {
        $content.before("<div class='modalHeader'>" + settings.name + '</div>');
      }
      else
        $(".modalHeader").empty().text(settings.name);
      $content.empty().append(settings.content);
      document.getElementById("modal").style.backgroundColor = settings.color;

      $modal.css({
        width: settings.width || 'auto',
        height: settings.height || 'auto'
      })

      method.center();

      $(window).bind('resize.modal', method.center);

      $modal.show();
      $overlay.show();
    };

    // Close the modal
    method.close = function () {
      $modal.hide();
      $overlay.hide();
      $content.empty();
      $(window).unbind('resize.modal');
    };

    $close.click(function (e) {
      e.preventDefault();
      method.close();
    });

    $(".addFieldAction").live("click", function () {
      $('.table tr:last').after('<tr><td contenteditable></td><td><select id="select1" onchange="getValue(this)"><option value="$">Unspecified</option><option value="val1">Single-Line Text</option><option value="val2">Multi-Line Text</option><option value="val3">Multi-Option Select</option></select></td><td contenteditable></td><td contenteditable></td><td><img class="trash" src="trash.png"/></td></tr>');
    });

    return method;
  }());

});


function buildTable(entityType) {
  var table = '<table class="table fixedSize"><thead><tr><th>Field Name</th><th>Field Type</th><th>Data Source</th><th>Notes</th><th></th></tr></thead><tbody>';
  var dict = {};
  if (entityType == "Location")
    dict = locationFields;
  else if (entityType == "Healthcare Professional")
    dict = healthcareProfessionalFields;
  else if (entityType == "Healthcare Facility")
    dict = healthcareFacilityFields;
  else if (entityType == "ATM")
    dict = atmFields;
  else if (entityType == "Restaurant")
    dict = restaurantFields;
  else if (entityType == "Event")
    dict = eventFields;
  var row = '';
  for (var key in dict) {
    row = '<tr><td>' + key + '</td><td>' + dict[key] + '</td><td contenteditable></td><td contenteditable></td><td></td></tr>';
    table = table + row;
  }
  table = table + '</tbody></table><div class="addField"><a href="#" class="addFieldAction">+ Add a Field</a></div>';
  return table;
}


var locationFields = {
  "Name": "Single-Line Text",
  "Categories": "Categories",
  "Address": "Address",
  "Phone Number": "Phone",
  "Entity ID": "Single-Line Text"
}

var restaurantFields = {
  "Name": "Single-Line Text",
  "Categories": "Categories",
  "Address": "Address",
  "Phone Number": "Phone",
  "Entity ID": "Single-Line Text"
}

var atmFields = {
  "Name": "Single-Line Text",
  "Categories": "Categories",
  "Address": "Address",
  "Phone Number": "Phone",
  "Entity ID": "Single-Line Text"
}

var healthcareProfessionalFields = {
  "Name": "Single-Line Text",
  "Categories": "Categories",
  "Address": "Address",
  "Phone Number": "Phone",
  "Entity ID": "Single-Line Text"
}
var healthcareFacilityFields = {
  "Name": "Single-Line Text",
  "Categories": "Categories",
  "Address": "Address",
  "Phone Number": "Phone",
  "Entity ID": "Single-Line Text"
}
var eventFields = {
  "Name": "Single-Line Text",
  "Categories": "Categories",
  "Address": "Address",
  "Phone Number": "Phone",
  "Entity ID": "Single-Line Text"
}
