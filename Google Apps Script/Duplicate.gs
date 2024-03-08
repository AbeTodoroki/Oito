function removeDuplicates() {
  var sheetNames = ['Plano', 'Juiz', 'Juizo'];
  var startRow = 3;

  for (var i = 0; i < sheetNames.length; i++) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetNames[i]);

    if (sheet) {
      var dataRange = sheet.getRange(startRow, 2, sheet.getLastRow() - startRow + 1, 1);
      var values = dataRange.getValues();
      var uniqueValues = [];
      var duplicateRows = [];

      for (var j = 0; j < values.length; j++) {
        var currentValue = values[j][0];

        if (uniqueValues.indexOf(currentValue) === -1) {
          uniqueValues.push(currentValue);
        } else {
          duplicateRows.push(j + startRow);
        }
      }

      for (var k = duplicateRows.length - 1; k >= 0; k--) {
        sheet.deleteRow(duplicateRows[k]);
      }
    } else {
      console.log("Cannot remove duplicates in this sheet.");
    }
  }
}
