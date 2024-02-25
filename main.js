// Importing the crawlPage function from crawl.js and the printReports function from report.js
const { crawlPage } = require("./crawl.js");
const { printReports } = require("./report.js");

// Defining the main function as an asynchronous function
async function main() {
  // Checking if the command line arguments provided are less than 3
  if (process.argv.length < 3) {
    console.log("no website provided"); // Printing an error message
    process.exit(1); // Exiting the process with a failure code
  }

  // Checking if the command line arguments provided are more than 3
  if (process.argv.length > 3) {
    console.log("too many command line args"); // Printing an error message
    process.exit(1); // Exiting the process with a failure code
  }
  // Extracting the base URL from the command line arguments
  const baseURL = process.argv[2];

  // Printing a message indicating the start of the crawl with the provided base URL
  console.log(`starting crawl of ${baseURL}`);

  // Initiating the crawling process for the specified base URL, resulting in a list of crawled pages
  const pages = await crawlPage(baseURL, baseURL, {});

  // Generating and printing reports based on the crawled pages
  printReports(pages);
}

// Calling the main function to start the execution
main();
