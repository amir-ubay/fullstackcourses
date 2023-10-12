sequenceDiagram
participant user
participant browser
participant server

  user->>browser : Type text in input field and submit
  browser-->>user : Push the new note to main notes data
  browser-->user : Redraw the html elements based on new notes data
  browser-->server : Send the new notes data to server