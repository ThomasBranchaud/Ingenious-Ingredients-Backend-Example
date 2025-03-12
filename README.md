# Ingenious-Ingredients-Backend-Example
This is a condensed version of the project meant for showcasing the Backend developed by Thomas Branchaud

A Full version of the project and an overview can be found at this repository -> https://github.com/cs4241-c25/final-project-ingenious-ingredients

And a link to the final project hosted on Vercel can be found here -> https://let-them-cook-groupi.vercel.app/

-- It sometimes takes a few minutes for the server and database to connect for the first time in a while, as they're hosted on free sites

Most of the work done for the backend can be found within the Server.ts file and inside a group of directories found at src/Get-Post Requests. Each directory within the Get-Post Request folder contains a set of functions that allow for easy access to the created endpoints. 

The backend is written in Typescript and uses Node.js, and although the frontend utilizes NextJS the backend doesn't make use of it's built in API routes. Connected to the backend is a MongoDB database that contains 4 different collections, each accessed from the Server.ts file through different GET or POST requests.

Along with the Server.ts and files contained within the Get-Post Reqeusts directory is another directory /Classes that contains a set of classes I developed for our project. These were used throuhgout the client and server, and are referenced many times in the GET or POST requests so I've left those files in this condensed version of the project.
