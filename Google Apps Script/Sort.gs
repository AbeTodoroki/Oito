function sortColumns() {
  var sheetNames = ['Plano', 'Juiz', 'Juizo'];
  var startRow = 3;

  for (var i = 0; i < sheetNames.length; i++) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetNames[i]);

    if (sheet && sheet.getName() !== 'Entrada de dados') {
      var dataRange = sheet.getRange(startRow, 1, sheet.getLastRow() - startRow + 1, 11);

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
      console.log("Cannot sort this sheet.");
    }
  }
}
