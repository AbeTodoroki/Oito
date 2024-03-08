function sortColumns() {
  var sheetNames = ['Plano', 'Juiz', 'Juizo'];
  var startRow = 3; // Sort from Row 3 and below

  // Iterate through each sheet name
  for (var i = 0; i < sheetNames.length; i++) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetNames[i]);

    // Check if the sheet exists and is not 'Entrada de dados'
    if (sheet && sheet.getName() !== 'Entrada de dados') {
      // Get the data range from Row 3 to the last row in the sheet for Columns A to K
      var dataRange = sheet.getRange(startRow, 1, sheet.getLastRow() - startRow + 1, 11);

      // Sort the data based on multiple columns (A to K)
      dataRange.sort([
        { column: 1, ascending: true },
        { column: 2, ascending: true },
        { column: 3, ascending: true },
        { column: 4, ascending: true },
        { column: 5, ascending: true },
        { column: 6, ascending: true },
        { column: 7, ascending: true },
        { column: 8, ascending: true },
        { column: 9, ascending: true },
        { column: 10, ascending: true },
        { column: 11, ascending: true }
      ]);
    } else {
      // Log a message or take alternative action if the sheet does not exist or is 'Entrada de dados'
      console.log("Cannot sort this sheet.");
    }
  }
}
