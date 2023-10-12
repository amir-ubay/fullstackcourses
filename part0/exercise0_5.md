sequenceDiagram
    participant user
    participant browser
    participant server

    user->>browser : Input URL: https://studies.cs.helsinki.fi/exampleapp/spa
    browser-->>server : GET the resource from URL
    server-->>browser : Return HTML and Data resource to browser
    browser-->>server : GET additional resources such as CSS and JS based on HTML
    server-->>browser : Return requested additional resources
    browser->>user : Display the resources as one union HTML+CSS+JS with the JSON Data
