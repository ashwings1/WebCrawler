// Importing the JSDOM module from the jsdom package
const { JSDOM } = require("jsdom");

// Asynchronous function responsible for crawling a web page and its links
async function crawlPage(baseURL, currentURL, pages) {
  // Creating URL objects for the base and current URLs
  const baseURLObj = new URL(baseURL);
  const currentURLObj = new URL(currentURL);

  // Checking if the hostname of the base URL matches the hostname of the current URL
  if (baseURLObj.hostname != currentURLObj.hostname) {
    // If they don't match, return the current state of pages without further processing
    return pages;
  }

  // Normalizing the current URL for consistency
  const normalizedCurrentURL = normalizeURL(currentURL);

  // Checking if the normalized current URL is already in the pages object
  if (pages[normalizedCurrentURL] > 0) {
    // If it's already present, increment its count and return the updated pages object
    pages[normalizedCurrentURL]++;
    return pages;
  }

  // If the normalized current URL is not present in the pages object, add it with a count of 1
  pages[normalizedCurrentURL] = 1;

  // Logging a message indicating the current URL is being crawled
  console.log(`actively crawling: ${currentURL}`);

  try {
    // Fetching the current URL
    const resp = await fetch(currentURL);

    // Checking for errors in the fetch response
    if (resp.status > 399) {
      console.log(
        `error in fetch with status code: ${resp.status} on page: ${currentURL}`
      );
      return pages;
    }

    // Retrieving the content type of the response
    const contentType = resp.headers.get("content-type");

    // Checking if the response is HTML content
    if (!contentType.includes("text/html")) {
      console.log(
        `non-html response, content type: ${contentType} on page: ${currentURL}`
      );
      return pages;
    }

    // Extracting the HTML body from the response
    const htmlBody = await resp.text();

    // Extracting URLs from the HTML body
    const nextURLs = getURLsFromHTML(htmlBody, baseURL);

    // Recursively crawling each extracted URL
    for (const nextURL of nextURLs) {
      pages = await crawlPage(baseURL, nextURL, pages);
    }
  } catch (err) {
    // Handling errors that occur during the fetch process
    console.log(`error in fetch: ${err.message}, on page: ${currentURL}`);
  }

  // Returning the updated pages object
  return pages;
}

// Function to extract URLs from HTML content
function getURLsFromHTML(htmlBody, baseURL) {
  // Array to store extracted URLs
  const urls = [];

  // Creating a JSDOM object from the HTML body
  const dom = new JSDOM(htmlBody);

  // Selecting all 'a' elements from the document
  const linkElements = dom.window.document.querySelectorAll("a");

  // Iterating over each 'a' element
  for (const linkElement of linkElements) {
    // Checking if the href attribute of the link is a relative URL
    if (linkElement.href.slice(0, 1) === "/") {
      // If it's relative, create a URL object and push it to the urls array
      try {
        const urlObj = new URL(`${baseURL}${linkElement.href}`);
        urls.push(urlObj.href);
      } catch (err) {
        // Handling errors related to relative URLs
        console.log(`error with relative URL: ${err.message}`);
      }
    } else {
      // If it's an absolute URL, create a URL object and push it to the urls array
      try {
        const urlObj = new URL(linkElement.href);
        urls.push(urlObj.href);
      } catch (err) {
        // Handling errors related to absolute URLs
        console.log(`error with absolute URL: ${err.message}`);
      }
    }
  }
  // Returning the array of extracted URLs
  return urls;
}

// Function to normalize a URL
function normalizeURL(urlString) {
  // Creating a URL object from the URL string
  const urlObj = new URL(urlString);

  // Concatenating the hostname and pathname
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;

  // Checking if the URL ends with a slash and removing it if present
  if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
    return hostPath.slice(0, -1);
  }
  // Returning the normalized URL
  return hostPath;
}

// Exporting the functions for external use
module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
};
