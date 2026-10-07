// BEFORE: nested callbacks (callback hell / pyramid of doom)
// Task: read a.txt -> write it to b.txt -> append a line to b.txt -> read b.txt

const fs = require("fs");

fs.readFile("a.txt", "utf8", (err, data) => {
  if (err) {
    console.log("Read error:", err.message);
  } else {
    fs.writeFile("b.txt", data, (err) => {
      if (err) {
        console.log("Write error:", err.message);
      } else {
        fs.appendFile("b.txt", "\nProcessed", (err) => {
          if (err) {
            console.log("Append error:", err.message);
          } else {
            fs.readFile("b.txt", "utf8", (err, result) => {
              if (err) {
                console.log("Final read error:", err.message);
              } else {
                console.log("Final content:");
                console.log(result);
              }
            });
          }
        });
      }
    });
  }
});
