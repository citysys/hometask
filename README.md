
**Front End Home Task**

Figma Design

The Figma design can be accessed via this [link](https://www.figma.com/design/KwwJjqXR8KOBfP1Qj5gfYS/%D7%AA%D7%A8%D7%92%D7%99%D7%9C-%D7%9C%D7%91%D7%99%D7%A6%D7%95%D7%A2?node-id=0-1&t=9bI8a9cWOIG3XdJO-0).

Please note that the carousel component in the design is for display purposes only; there is no need to implement carousel functionality.
Additionally, aside from the submit button, all other buttons are for design only and do not require any functionality.

Setup

To get started with the project, please fork the repository to your GitHub account.

**Requirements**

Technical Requirements

- Use TypeScript & SCSS: The project should be developed using TypeScript for type safety and SCSS for styling.
- Ant Design (antd) Form: The form should utilize Ant Design (antd) components. Ensure that validation and form structure leverage antd features.
- User-Friendly Error Display: Display errors in a user-friendly manner, such as a red border around the field. All error messages should be displayed in Hebrew.
- Form Submission: Upon form submission, the form should be validated. If there are no errors, display a basic success message in an antd modal (no need for advanced styling).
- **API Requests**: Use pure Axios requests to handle API calls. Do not use any additional libraries for making HTTP requests.

Features

To complete this project, the form must include the following features:

- Israeli ID Validation: Implement validation to ensure the user's ID complies with the Israeli identification standard.
- City and Street Fields: Use the gov.il API to populate the 'city' and 'street' fields. The 'street' field should be dependent on the selected city.
- Restricted Input: Ensure that the user cannot enter a value for 'city' or 'street' that is not present in the array received from the API.

Submission

After completing the project, please submit it by creating a pull request to our repository.

Thank you, and good luck!
