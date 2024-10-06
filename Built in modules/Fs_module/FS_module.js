const fs = require("fs");
// utf8 specifies the encoding of the file.

// fs.readFile("sample.txt", "utf8", (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });

// const contentToAdd = "\nThis will be appended to the file";

// fs.appendFile("newFile.txt", contentToAdd, (err) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log("Content appended successfully");
// });

// fs.writeFile(
//   "sample.txt1",
//   "Hello , React is the best framework",
//   "utf8",
//   (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("File created successfully");
//     }
//   }
// );

// fs.readFile("sample.txt1", "utf8", (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });

// fs.rename("sample.txt1", "example.txt", (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("File renamed successfully");
//   }
// });

// fs.unlink("example.txt", (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("File deleted successfully");
//   }
// });

// Reading a Directory

// fs.readdir("./", (err, files) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(files); // Array of file names in the directory
// });

// fs.access("example.txt", fs.constants.F_OK, (err) => {
//   if (err) {
//     console.log("File does not exist");
//   } else {
//     console.log("File exists");
//   }
// });

// Reading a file synchronously

try {
  // The readFileSync method reads the content of the file synchronously.
  // This blocks the execution until the file is completely read.
  // 'utf8' specifies the encoding format, which ensures proper string output.
  const data = fs.readFileSync("example.txt", "utf8");

  // Log the file content to the console
  console.log(data);
} catch (err) {
  // If an error occurs (such as file not existing), it will be caught here.
  console.error(err);
}

// Writing to a file synchronously

try {
  // writeFileSync creates or overwrites the file synchronously.
  // The first argument is the filename, the second is the content to write.
  fs.writeFileSync("newFile.txt", "This is sync write");

  // If the write is successful, log this message
  console.log("File written");
} catch (err) {
  // Catch and log any error that occurs during the file write operation
  console.error(err);
}

// Watching a file for changes

// fs.watch monitors the specified file ('example.txt') for changes.
// Whenever the file is modified, the callback is triggered.
// 'eventType' refers to the type of change (e.g., 'rename', 'change').
// 'filename' is the name of the file that triggered the event (useful in directories).
fs.watch("example.txt", (eventType, filename) => {
  // Log the type of change and the filename being watched
  console.log(`File ${filename} changed with event type: ${eventType}`);
});

// Synchronous methods (like readFileSync and writeFileSync) block the event loop until the operation is complete, making them useful for small tasks.
// Asynchronous methods (like fs.watch) allow you to monitor files without blocking the main thread. When the file is modified, the callback function is triggered.
// These are simple and effective for basic file system operations in Node.js.
