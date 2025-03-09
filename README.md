# innoscripta frontend task

This is a simple News Aggregator built with React, Vite, and TypeScript. It fetches news data from multiple APIs and allows users to search through the aggregated data locally.

## Technologies Used

- **Vite** – Fast build tool for modern web projects
- **Ky** – Lightweight HTTP client for fetching data
- **Tailwind CSS** – Utility-first CSS framework for styling
- **Docker** – Containerization for easy deployment

## Project Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/omar-diaa-48/innoscripta.git
   ```

2. 
  - Run with Docker

    - Build the image

      ```sh
      docker build -t innoscripta .
      ```

    - Run the image
      ```sh
      docker run -p 8386:8386 innoscripta
      ```

  - Run locally

    - Install dependencies

      ```sh
        yarn
        ```

    - Run the project

      ```sh
        yarn dev
        ```

```
## Important notes

1. Normally, .env files are ignored in version control for security reasons. However, in this project, the .env file is included to make it easier for anyone to run the task without needing to obtain API keys manually.

2. Most of these APIs have rate limitations, so to ensure smooth operation:
* The application fetches data once at the start.
* Further searches are performed locally within the fetched dataset.
```
