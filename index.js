import express, { response } from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded( { extended: true } ));

/*
    VARIABLES
*/
let pages = [
    {
        name: "Home",
        url: "/"
    },
    {
        name: "About",
        url: "/about"
    }
];

let blog_posts = [];
let postId = 0;



/*

    GET REQUESTS

*/
app.get("/", (request, response) => {
    response.render("index.ejs", { posts: blog_posts, url: request.url, pages: pages });
});

app.get("/about", (request, response) => {
    response.render("about.ejs", { url: request.url, pages: pages });
});



/*

    POST REQUESTS

*/
app.post("/submit-post", (request, response) => {
    if (request.body["post-title"]) {
        let post = {
            postId: (postId++),
            title: request.body["post-title"],
            content: request.body["post-content"]
        };

        blog_posts.push(post);
    }

    response.redirect("/");
});

app.post("/delete-post", (request, response) => {

    if (request.body["post-to-delete"]) {
        blog_posts.forEach((post) => {
            if (post.postId == request.body["post-to-delete"]) {
                let postIndex = blog_posts.indexOf(post);
                blog_posts.splice(postIndex, 1);
            }
        });
    }

    response.redirect("/");
});

app.listen(port, () => {
    console.log(`We're listening on port ${port}`);
});