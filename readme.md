# Today I Learned - Fact Management System

This is a web-based application for managing facts. Users can view, add, and delete facts from the system. also, users can make some reactions to each facts.

## Features

- View a list of all facts
- View facts for a specific category
- Enable scrolling through the list of facts
- Ability to add a new fact to the database and view it in the list
- Delete a fact from the system
- Ability to make some reactions to each facts (interesting, mind-blowing, false)
- Ability to view the number of reactions for each fact
- Full handling of rection numbers (increase, decrease, and reset)
- Storing the reactions numbers in the local storage to prevent losing data when refreshing the page
- Marking disputed facts with a red sign
- Responsive design

## Getting Started

To run the project on your local machine, follow these steps:

1. Clone the repository to your local machine:
   git clone https://github.com/Mahmoud-AbouDeghedy/Today-I-Learned.git

2. Install the necessary dependencies:
   npm install

3. Start the server:
   npm start

4. Open the application in your web browser:
   http://localhost:3000

The application is also deployed on Netlify: https://today-i-learned-deghedy.netlify.app/

## Usage

Once the application is running, you can use the following features:

- View all facts: The home page of the application displays a list of all facts in the system.
- View facts for a specific category: Click on a category name in the sidebar to view only facts for that category.
- Add a new fact: Click the "Add Fact" button to open a form where you can enter a new fact. Click "Save" to add the fact to the system.
- Delete a fact: Each fact in the list has a delete icon button. Click this button to delete the corresponding fact from the system.

## Technologies Used

- HTML
- CSS
- JavaScript
- Node.js
- React
- Supabase
- Material-UI
- Tailwind CSS

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository to your own GitHub account.
2. Create a new branch with your changes: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push the branch to your fork: `git push origin my-new-feature`
5. Create a new pull request and describe your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
