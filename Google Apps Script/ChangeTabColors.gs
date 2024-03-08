function changeTabColors() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  var today = new Date();
  var todayWeekNumber = Utilities.formatDate(today, Session.getScriptTimeZone(), "w");

  sheets.forEach(function(sheet) {
    sheet.setTabColor(null);
    var range = sheet.getRange("E2:E40");
    var values = range.getValues();

    for (var i = 0; i < values.length; i++) {
      var cellValue = values[i][0];
      if (cellValue !== "") {
        var cellDate = new Date(cellValue);
        var cellWeekNumber = Utilities.formatDate(cellDate, Session.getScriptTimeZone(), "w");

        if (cellWeekNumber <= todayWeekNumber) {
          sheet.setTabColor("red");
        } else {
          sheet.setTabColor("green");
        }
        break;
      }
    }
  });
}
