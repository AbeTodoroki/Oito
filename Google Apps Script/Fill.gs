function checkFilledCells() {
  var entradaSheetName = 'Entrada de dados';
  var entradaSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(entradaSheetName);

  // Check and copy rows 3, 7, and 11 on 'Entrada de dados' sheet
  var targetRowNumbers = [3, 7, 11];
  targetRowNumbers.forEach(function(checkRowNum) {
    // Check if the row is filled in columns A to C
    var checkRowData = entradaSheet.getRange(checkRowNum, 1, 1, 3).getValues()[0];
    var dataFilled = checkRowData.every(function (value) {
      return value !== '';
    });

    // If the row is filled, proceed with copying
    if (dataFilled) {
      // Copy columns A to E
      var copyRowData = entradaSheet.getRange(checkRowNum, 1, 1, 5).getValues()[0];

      // Determine the target sheet based on the row number
      var targetSheetNames = ['Plano', 'Juiz', 'Juizo'];
      var targetSheetName = targetSheetNames[targetRowNumbers.indexOf(checkRowNum)];
      var targetSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(targetSheetName);

      // Insert a new row above Row 3 on the target sheet
      targetSheet.insertRowBefore(3);

      // Set the data in the newly inserted row on the target sheet (copy columns A to E)
      targetSheet.getRange(3, 1, 1, 5).setValues([copyRowData]);

      // Clear the content of the row on 'Entrada de dados' sheet (columns A to E)
      entradaSheet.getRange(checkRowNum, 1, 1, 5).clearContent();
    }
  });
}