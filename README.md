# User Management System 🚀

A user-friendly and responsive User Management System built with **React**,
**Redux**, and **fetch API** for efficient API handling. This project includes
secure login, user list management, and editing functionality, all wrapped with
proper form validation, error handling, and token persistence.

## Features ✨

- 🔄 **React** for the frontend framework.
- 📊 **State Management** via Redux Toolkit.
- 🌐 **API Requests** using fetch API.
- 🎨 **Responsive Design** for both desktop and mobile views.
- 🛡️ **Secure Login** with form validation and token-based authentication.
- 🔍 **Client-Side Search & Filtering** on the users' list.
- 📝 **User Edit Functionality** with form validation.
- 🚥 **Routing** with React Router for seamless navigation.
- 📂 **Token Persistence** using Local Storage.
- ❌ **Error Handling** to ensure smooth user experience during API
  interactions.

## Technologies Used 💻

- **React**
- **Redux**
- **Axios**
- **Tailwind CSS**
- **React Router**
-**react-hook-form**
-**react-hot-toast**

## How it Works ⚙️

1.  **Login Page**: The user can log in with valid credentials. On success, a
    token is saved to Local Storage. If the token is missing or expired, the
    user will be redirected to the login page.
2.  **User List**: After login, users are redirected to the user list, where
    they can view, search, and filter users.
3.  **Edit User**: Users can select and edit details of any user from the list.
    All updates are validated and saved via API.
4.  **Delete User**: Users can delete any user from the list, with a confirmation modal to prevent accidental deletion. The user is removed from the list via API.
5.  **Logout**: The user can log out anytime, which clears the token and
    redirects to the login screen.


## API Error Handling 🚨

- Proper error messages are displayed if an API call fails, whether it's during
  login, fetching users, or updating a user's details.
- Form validation ensures that no invalid data is submitted and error are
  handled properly and shown using toast message

## Bonus Points 🎉

- **Client-Side Search** and **Filtering** implemented for better user experience.
- **React Router** for smooth navigation between pages.
- **High Performance Optimization**: Used **memo** higher-order function for every component to improve performance and prevent unnecessary re-renders.
- **Form Validation**: Integrated **react-hook-form** and **Yup** for schema-based validation and type validation.
- The app is hosted on **Vercel**:
  [Link to live project](https://reqres-api-assignment.vercel.app)


`## How to Run the Project 🏃‍♂️

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo-link.git 

   ```

2. Navigate to the project directory:

   ```

   cd project-name

   ```

3. Install dependencies:

   ```

   npm install

   ```

4. Run the project:

   ```

   npm start

   ```

5. Open your browser and go to `http://localhost:5173` to view the app.
