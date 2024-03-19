# DIY Creative Display

DIY Creative Display is a web application where users can showcase their do-it-yourself (DIY) projects. Whether it's Home decor, Crafts, Art and Design or any other creative endeavor, users can upload images and descriptions of their projects to share with the community. The platform is built using Flask for the backend and Next.js for the frontend, providing a seamless and interactive user experience.

<img src="https://res.cloudinary.com/nkechi-christabel/image/upload/v1710869274/DIY_CD.png" alt="Diy Creative Display landing page">

## Features

1.  **Signup**: Users start their authentication process by signing up
2.  **Login**: To be able to access some routes and use certain features, a user must log in
3.  **Upload DIY Projects**: Users can easily upload images and descriptions of their DIY projects to showcase their creativity.
4.  **Delete**: Users can only delete posts created by them.
5.  **Like**: Users can express their appreciation for DIY projects by liking them.
6.  **Save**: Users can save DIY projects they find interesting to view later.
7.  **Comment**: Engage with other users by leaving comments on their DIY projects.
8.  **Filter**: Users can filter DIY projects based on categories, such as Home decor, Crafts, Art and Design etc.
9.  **Search**: Easily find specific DIY projects by searching for keywords or categories.

## Technologies Used

### Flask

Flask is used for the backend server to handle user authentication, data storage, and API endpoints.

### Next.js

Next.js is used for the frontend to create a dynamic and responsive user interface for browsing and interacting with DIY projects.

## Getting Started

To run the DIY Creative Display locally, follow these steps:

#### Clone the repository:

    git clone https://github.com/your-username/diy-creative-display.git

#### Install dependencies for the backend (Flask):

    cd diy-creative-display/backend
    pip install -r requirements.txt

#### Setup Mysql Database:

    sudo mysql < mysql_setup.sql

#### Run the Flask backend:

    python3 -m diy_app.app

#### Install dependencies for the frontend (Next.js):

    cd diy-creative-display/frontend
    npm install

#### Run the Next.js frontend:

    npm run dev

#### Open your browser and navigate to http://localhost:3000 to access the DIY Creative Display application.
