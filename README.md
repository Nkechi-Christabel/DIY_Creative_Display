# DIY Creative Display

DIY Creative Display is a web application where users can showcase their do-it-yourself (DIY) projects. Whether it's Home decor, Crafts, Art and Design or any other creative endeavor, users can upload images and descriptions of their projects to share with the community. The platform is built using Flask for the backend and Next.js for the frontend, providing a seamless and interactive user experience.

## Features

1.  Upload DIY Projects: Users can easily upload images and descriptions of their DIY projects to showcase their creativity.
2.  Like: Users can express their appreciation for DIY projects by liking them.
3.  Save: Users can save DIY projects they find interesting to view later.
4.  Comment: Engage with other users by leaving comments on their DIY projects.
5.  Filter: Users can filter DIY projects based on categories, such as Home decor, Crafts, Art and Design etc.
6.  **Search**: Easily find specific DIY projects by searching for keywords or categories.

## Technologies Used
### Flask
Flask is used for the backend server to handle user authentication, data storage, and API endpoints.

### Next.js
Next.js is used for the frontend to create a dynamic and responsive user interface for browsing and interacting with DIY projects.


## Getting Started
To run the DIY Creative Display locally, follow these steps:

1. Clone the repository:

    git clone https://github.com/your-username/diy-creative-display.git

2. Install dependencies for the backend (Flask):

    cd diy-creative-display/backend
    pip install -r requirements.txt

3.  Setup Mysql Database:

    sudo mysql < mysql_setup.sql

4. Run the Flask backend:

    python3 -m diy_app.app

5.  Install dependencies for the frontend (Next.js):

    cd diy-creative-display/frontend
    npm install

6.  Run the Next.js frontend:

    npm run dev

#### Open your browser and navigate to http://localhost:3000 to access the DIY Creative Display application.