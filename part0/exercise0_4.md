sequenceDiagram
participant user
participant browser
participant server

    user->>browser: Type text in input field and submit
    activate browser
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/notes/exampleapp/new_note
    activate server
    server-->>browser: Auto reload the page
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: Refetch again the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: Refetch again the JavaScript file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: Send the latest JSON Data
    deactivate server
    activate browser
    browser-->>user: Render the latest JSON data as web element
