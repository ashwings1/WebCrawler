// Function responsible for printing reports based on the crawled pages
function printReports(pages) {
  // Printing report header
  console.log("=========");
  console.log("REPORT");
  console.log("=========");

  // Sorting pages based on hits count
  const sortedPages = sortPages(pages);

  // Iterating over sorted pages and printing each entry
  for (const sortedPage of sortedPages) {
    const url = sortedPage[0]; // Extracting URL
    const hits = sortedPage[1]; // Extracting hits count
    console.log(`Found ${hits} links to page: ${url}`); // Printing URL and hits count
  }

  // Printing report footer
  console.log("=========");
  console.log("END REPORT");
  console.log("=========");
}

// Function to sort pages based on hits count
function sortPages(pages) {
  // Converting pages object to array of [key, value] pairs
  const pagesArr = Object.entries(pages);

  // Sorting pages array based on hits count in descending order
  pagesArr.sort((a, b) => {
    aHits = a[1]; // Hits count for page a
    bHits = b[1]; // Hits count for page b
    return b[1] - a[1]; // Sorting in descending order based on hits count
  });

  // Returning sorted pages array
  return pagesArr;
}

// Exporting functions for external use
module.exports = {
  sortPages,
  printReports,
};
