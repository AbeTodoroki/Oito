function removeDuplicates() {
  var sheetNames = ['Plano', 'Juiz', 'Juizo'];
  var startRow = 3; // Check from Row 3 and below

  // Iterate through each sheet name
  for (var i = 0; i < sheetNames.length; i++) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetNames[i]);

    // Check if the sheet exists
    if (sheet) {
      // Get the data range from Row 3 to the last row in Column B
      var dataRange = sheet.getRange(startRow, 2, sheet.getLastRow() - startRow + 1, 1);

      var values = dataRange.getValues();
      var uniqueValues = [];
      var duplicateRows = [];

      // Loop through each row in Column B
      for (var j = 0; j < values.length; j++) {
        var currentValue = values[j][0]; // Assuming Column B is the second column (index 0)

        // Check if the value is already in the uniqueValues array
        if (uniqueValues.indexOf(currentValue) === -1) {
          uniqueValues.push(currentValue);
        } else {
          duplicateRows.push(j + startRow); // Add row number to duplicateRows array (offset by startRow)
        }
      }

      // Remove duplicate rows
      for (var k = duplicateRows.length - 1; k >= 0; k--) {
        sheet.deleteRow(duplicateRows[k]);
      }
    } else {
      // Log a message or take alternative action if the sheet does not exist
      console.log("Cannot remove duplicates in this sheet.");
    }
  }
}
