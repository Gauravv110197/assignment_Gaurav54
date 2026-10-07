// AFTER: same task, but each step is a named function (no nesting, no Promises)
// Each function checks for an error first and returns early.

const fs = require("fs");

function readFirst() {
  fs.readFile("a.txt", "utf8", afterRead);
}

function afterRead(err, data) {
  if (err) return handleError("Read error", err);
  fs.writeFile("b.txt", data, afterWrite);
}

function afterWrite(err) {
  if (err) return handleError("Write error", err);
  fs.appendFile("b.txt", "\nProcessed", afterAppend);
}

function afterAppend(err) {
  if (err) return handleError("Append error", err);
  fs.readFile("b.txt", "utf8", afterFinalRead);
}

function afterFinalRead(err, result) {
  if (err) return handleError("Final read error", err);
  console.log("Final content:");
  console.log(result);
}

function handleError(message, err) {
  console.log(message + ":", err.message);
}

readFirst();
