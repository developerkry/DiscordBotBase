const mongoose = require("mongoose");
require("colors");

async function init(URI) {
  mongoose.set("strictQuery", true);

  await mongoose.connect(URI);

  if (mongoose.connect) {
    console.log(
      "[ DATABASE ]".bold.green +
        " MongoDB".bold +
        " Connection Successfully".bold.green
    );
    console.log(" ");
  }

  mongoose.connection.on("reconnected", () => {
    console.log(
      "[ DATABASE ]".bold.green +
        " MongoDB".bold +
        " ReConnection Successfully".bold.blue
    );
    console.log(" ");
  });

  mongoose.connection.on("error", (error) => {
    console.error(
      "[ DATABASE ]".bold.green +
        " MongoDB".bold +
        " Failed to Connect".bold.red,
      error.message
    );
    console.log(" ");
  });

  mongoose.connection.on("disconnected", (d) => {
    console.log(
      "[ DATABASE ]".bold.green + " MongoDB".bold + " Disconnected".bold.red
    );
    // console.log('[DATABASE]'.green + ' Reason for Disconnecting'.bold + `\n${d}`);
    console.log(" ");
  });
}

module.exports = {
    init
}
