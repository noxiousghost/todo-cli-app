# TODO CLI App

This project is for creating a TODO application using CLI by providing appropriate arguments to the command. It allows to create a todo item with name, deadline, status and tags. It also supports viewing, modifying, archiving and deleting an existing item from the list.

## Features

- JSON Based Persistence
- Code in typescript with proper object schema.
- Save a item in todo list with the following properties:
  1. Name
  2. Deadline
  3. Status (IN PROGRESS, TODO, COMPLETED)
  4. Tags (item can have multiple tags)
- View all items in todo list
- Deadline by today
- Filter by tags, status
- Search by title  
  Example: Item: ‘Walk the dog in the store’. Search should match partials like ‘walk’, ‘th’, ‘do’, ‘dog’
- Archive a particular item
- Delete an item from the list

#### UX Features Requirements

- Should be visually appealing with colors in command line
- Should be easy to use
- Should provide a help menu
- Should be usable as a command line tool that takes command line arguments, without explicitly using nodejs.  
  Example: todo-cli <args> Instead of node index.js <args>

## Technology Stack

- **Environment**: Node.js (TypeScript)

## Project Setup

### Prerequisites

- Node.js

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/noxiousghost/todo-cli-app.git
   cd todo-cli-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Usages

1. Add a new item to todo list:

```bash
  npm run dev -- add -n "<Task name>" -d "<Task deadline date>" -t "tag1" "tag2" ...
```
