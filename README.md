# TODO CLI App

This project is for creating a TODO application using CLI by providing appropriate arguments to the command. It allows to create a todo item with name, deadline, status and tags. It also supports viewing, modifying, archiving and deleting an existing item from the list.

## Features

- JSON Based Persistence
- Code in typescript with proper object schema.
- Save a item in todo list with the following properties:
  1. Name
  2. Deadline
  3. Status
  4. Tags (item can have multiple tags)
- View all items in todo list
- Filter items by:

  1. Deadline by today
  2. Tags
  3. Status

- Search by title  
   Example: Item: ‘Walk the dog in the store’. Search should match partials like ‘walk’, ‘th’, ‘do’, ‘dog’
- Archive a particular item
- Change status of an item
- Delete an item from the list
- Delete all items with status COMPLETE

#### UX Features

- Visually appealing with colors in command line
- Easy to use
- Provides a help menu
- Usable as a command line tool that takes command line arguments, without explicitly using nodejs.  
  Example: todo-cli <args> Instead of node index.js <args>

## Technology Stack

- **Environment**: Node.js (TypeScript)
- **Packages**:
  1. [Commander](https://github.com/tj/commander.js): For managing CLI arguments parsing.
  2. [ZOD](https://zod.dev/): For adding schema validation for Tasks.
  3. [UUID](https://www.npmjs.com/package/uuid): For creating automatic unique ids for new new tasks.
  4. [Chalk](https://github.com/chalk/chalk): For formatting console output.

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

#### Run the application in development environment

**1. Add a new item to todo list:**

```bash
  npm run dev -- add -n "<Task name>" -d "<Task deadline date>" -t "tag1" "tag2" ...
```

**2. View all tasks**

```bash
  npm run dev -- show
```

**3. View all tasks including archived tasks**

```bash
  npm run dev -- show -a
```

**4. View archived tasks only**

```bash
  npm run dev -- show -ar
```

**5. Filter tasks by status**

```bash
  npm run dev -- show -s <status>
```

Allowed status names are: todo, in_progress and complete. any other than these will result in error.

**6. Filter tasks by tags**

```bash
  npm run dev -- show -t <tags...>
```

**7. Filter tasks by deadline by today**

```bash
  npm run dev -- show -d
```

**8. Delete a particular task by id**

```bash
  npm run dev -- delete -i <task_id>
```

**9. Delete all tasks which have complete status**

```bash
  npm run dev -- delete -c
```

**10. Modify a task's status**

```bash
  npm run dev -- modify <task_id> -s <status>
```

Allowed status names are: todo, in_progress and complete. any other than these will result in error.

**11. Archive or unarchive a task**

```bash
  npm run dev -- modify <task_id> -ar
```

**12. Search task by title**

```bash
  npm run dev -- search <search_query>
```

If put the search query in quotation mark ('single' or "double") if you are providing more than one word. Eg. "pay bills" instead of pay bills.

**13. Display help menu**

For general description of the application simply run:

```bash
  npm run dev -- help
```

OR simply:

```bash
  npm run dev --
```

It is possible to display help menu for every commands and arguments using help command after the command or argument. Eg. to display help for add command, run:

```bash
  npm run dev -- help add
```

Alternatively you can run the following to get the same result:

```bash
  npm run dev -- add -h
```

Same applies for show, modify, delete and search commands.

You can check the version of the application by running the following command:

```bash
  npm run dev -- -v
```

#### Run the application in terminal globally

It is possible to install the application and run it globally through your terminal. For that do the following steps:

**1. Build the application**

```bash
  npm run build
```

This command will build the TypeScript application with _tsc_ compiler and uses a bash script (./src/build/resolve-imports.sh) that resolves the import paths in the built application. That script need to have executable access in you local system. For that use the following command:

```bash
 chmod +x ./src/build/resolve-imports.sh
```

Note: If on windows, make sure you execute this command from bash shell (like git-bash). Windows command prompt or powershell don't run these bash commands :(

**2. Link the application globally**

```bash
  npm link
```

> npm link in a package folder will create a symlink in the global folder {prefix}/lib/node_modules/<package> that links to the package where the npm link command was executed. Read more about npm link from the [npm docs.](https://docs.npmjs.com/cli/v7/commands/npm-link)

**3. Run the application**

```bash
  todo-cli show
```

The commands and options are same as discussed in [run the application in development mode](#run-the-application-in-development-environment) section. You just have to replace `npm run dev --` with `todo-cli`.
It is possible to change the name of the application from _todo-cli_ to anything you like. For that you just have to modify the bin configuration in package.json file as.

```package.json
  "bin": {
    "your-custom-name-here": "./dist/index.js"
  },
```

After this you'd have to build the application again and install it globally as discussed [above 👆](#run-the-application-in-globally).
