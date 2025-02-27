import express from "express";
import cors from "cors";
import technigoMembers from "./data/technigo-members.json"
import booksData from "./data/books.json"

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  // console.log("req", req)
  // console.log("res", res)
  // res.send({responseMessage: "Hello Technigo!"}); 
  res.json({responseMessage: "Hello Technigo!"});
});
// HTMLElement.addEventListener('nameOfTheListener', () => {

// })

// EP1 Technigo members code along
app.get("/members", (request, response) => {
  const { name, role } = request.query
  let members = technigoMembers

  if (role) {
    members = members.filter(singleTechnigoMember => singleTechnigoMember.role.toLowerCase() ===
    role.toLowerCase())
    // members = technigoMembers.filter(singleTechnigoMember => { return singleTechnigoMember.role === role}) //this works too
  }
  if (name) {
    members = members.filter(singleTechnigoMember => { return singleTechnigoMember.name.toLowerCase() === name.toLowerCase()})
  }

  response.status(200).json({
    success: true,
    message: "OK",
    body: {
      technigoMembers: members
    }
  });
});

app.get("/members/:id", (request, response) => {
  const singleMember = technigoMembers.find((member) => {
    return member.id === +request.params.id
    // return member.id === Number(request.params.id) //this works too
    // return member.id.toString() === request.params.id // and this
  })
  if (singleMember) {
    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        member: singleMember
      }
    })
  } else {
    response.status(404).json({
      success: false,
      message: "Not found",
      body: {}
    })
  }

  console.log(singleMember)
  
});

// EP2 Books

app.get("/books", (request, response) => {
  const { title, authors } = request.query
  let books = booksData

  if (title) {
    books = books.filter(singleBookData => singleBookData.title.toLowerCase() ===
    title.toLowerCase())
  }

  if (authors) {
    books = books.filter(singleBookData => singleBookData.authors.toLowerCase() === authors.toLowerCase())
  }

  response.status(200).json({
    success: true,
    message: "OK",
    body: {
      booksData: books
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
