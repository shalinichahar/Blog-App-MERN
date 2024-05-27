# Blog-App-MERN

# Usage
- Register: Create a new account with a profile image.
- Login: Access your account.
- Dashboard: Manage your blog posts.
- Blog List: View all your blog posts, with options to edit or delete.
- Comments: Interact with other users by commenting on blog posts.


*Demo Video* : https://drive.google.com/file/d/1xUbiTw6Pq_4LYECfA8HGCSh_eer6Ahz9/view?usp=sharing

*Images* : 
<img width="955" alt="image" src="https://github.com/shalinichahar/Blog-App-MERN/assets/70834279/748074a8-2ca7-427b-a7b7-e872d30422f3">

<img width="953" alt="image" src="https://github.com/shalinichahar/Blog-App-MERN/assets/70834279/50f3cb93-9082-455d-b658-dc8038fc3d79">

<img width="944" alt="image" src="https://github.com/shalinichahar/Blog-App-MERN/assets/70834279/00319276-3feb-4342-b9f9-d2b44fb387fc">

<img width="934" alt="image" src="https://github.com/shalinichahar/Blog-App-MERN/assets/70834279/abdaf56f-a8a7-4ccc-9ed3-51f7b1faf79c">

<img width="919" alt="image" src="https://github.com/shalinichahar/Blog-App-MERN/assets/70834279/a7d0f776-9df2-48fa-a6e1-984c6d50725b">

<img width="957" alt="image" src="https://github.com/shalinichahar/Blog-App-MERN/assets/70834279/c75ac148-6436-4978-a1d3-88481f37bc96">


<img width="941" alt="image" src="https://github.com/shalinichahar/Blog-App-MERN/assets/70834279/03e055c9-86ad-4d34-b810-79e171eb8f28">

# Features
### User Authentication
- Registration: Users can create an account by providing their name, email, password, and profile image.
- Login: Secure login using email and password.
- JWT Authentication: The application uses JSON Web Tokens (JWT) for secure authentication.
### Profile Management
- Profile Image Upload: Users can upload a profile image during registration, which is displayed on their dashboard.
- Welcome Message: Personalized welcome message displayed on the dashboard.
### Blog Management
- Create Blog Post: Users can create new blog posts with a title, description, and image upload.
- View Blog Post: Users can view detailed blog posts.
- Edit Blog Post: Users can edit existing blog posts.
- Delete Blog Post: Users can delete blog posts with confirmation.
- List Blog Posts: All blog posts are displayed in a tabular format with actions to view, edit, or delete.
### Comment System (Extra Feature)
- Comments: Users can leave comments on blog posts.
- Replies: Users can reply to specific comments, facilitating interaction.
- Comment Management: Comments and replies are stored in the database along with the associated blog post.
### Responsive UI
- Material-UI: The application uses Material-UI for a consistent and modern user interface.
-Responsive Design: Ensures a good user experience on both desktop and mobile devices.

# Tech Stack
### Frontend
- React: JavaScript library for building user interfaces.
- Material-UI: React components for faster and easier web development.
- React Router: Declarative routing for React applications.
### Backend
- Node.js: JavaScript runtime for building fast and scalable network applications.
- Express.js: Fast, unopinionated, minimalist web framework for Node.js.
- Multer: Middleware for handling multipart/form-data, used for file uploads.
- JWT: JSON Web Tokens for secure user authentication.
### Database
-MongoDB: NoSQL database for storing user data and blog posts.

*Install dependencies*:
# For server
cd server
npm install

# For client
cd client
npm install

*Start the application*:
# Start the server
cd server
node server.js

# Start the client
cd client
npm start
