# Web Crawler Report Generator
This Node.js application crawls web pages, extracts URLs, and generates a report based on the crawled data.

# Installation
Clone this repository to your local machine.

Navigate to the project directory.

Install dependencies using npm:
```
npm install
```

# Usage
To generate a report based on a website, run the following command in your terminal:
```
node main.js <website_url>
```

Replace <website_url> with the URL of the website you want to crawl.

# Functionality
```
'crawl.js'
```

This file contains functions responsible for crawling web pages and extracting URLs.

crawlPage(baseURL, currentURL, pages): Asynchronously crawls a web page and its links. It returns an updated pages object containing the count of occurrences of each URL.

getURLsFromHTML(htmlBody, baseURL): Extracts URLs from HTML content. It returns an array of URLs found in the provided HTML content.

normalizeURL(urlString): Normalizes a URL for consistency. It removes any trailing slashes from the hostname and pathname.

```
'report.js'
```

This file contains functions for generating and printing reports based on crawled data.

printReports(pages): Prints a report header, lists URLs along with their hit counts (sorted by hit count in descending order), and prints a report footer.

sortPages(pages): Sorts the crawled pages based on hit counts in descending order. It returns an array of [URL, hits] pairs sorted by hit count.

```
'index.js'
```

This is the main entry point of the application. It reads the command-line arguments, initiates the crawling process, and prints the generated report.

# Dependencies

jsdom: For parsing HTML content and extracting URLs.



