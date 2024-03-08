function checkFilledCells() {
  var entradaSheetName = 'Entrada de dados';
  var entradaSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(entradaSheetName);

  var targetRowNumbers = [3, 7, 11];
  targetRowNumbers.forEach(function(checkRowNum) {
    var checkRowData = entradaSheet.getRange(checkRowNum, 1, 1, 3).getValues()[0];
    var dataFilled = checkRowData.every(function (value) {
      return value !== '';
    });

    if (dataFilled) {
      var copyRowData = entradaSheet.getRange(checkRowNum, 1, 1, 5).getValues()[0];
      var targetSheetNames = ['Plano', 'Juiz', 'Juizo'];
      var targetSheetName = targetSheetNames[targetRowNumbers.indexOf(checkRowNum)];
      var targetSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(targetSheetName);
      targetSheet.insertRowBefore(3);
      targetSheet.getRange(3, 1, 1, 5).setValues([copyRowData]);
      entradaSheet.getRange(checkRowNum, 1, 1, 5).clearContent();
    }
  });
}
