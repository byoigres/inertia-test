import { ViewData } from "inertia-node";

const template = (page: object, viewData: ViewData) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    
    <!-- Custom data -->
    <title>${viewData.title}</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    <!-- Your React, Vue or Svelte SPA -->
    <!-- <link rel="stylesheet" href="/build/bundle.css" /> -->
  </head>

  <!-- The Inertia page object -->
  <body>
    <div id="app" data-page='${JSON.stringify(page)}'></div>
    <script defer type="module" src="/app.js"></script>
  </body>
</html>
`;

export default template;
