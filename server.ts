import {MongoClient} from "mongodb";

import express from "express";
import {Request, Response} from 'express';
import cors from "cors";
import {Collection} from 'mongodb';



// Initialize the express application
const app = express();
app.use(cors({origin: 'https://let-them-cook-webware-group-is-projects.vercel.app'}));
app.use(express.json())
const port = 3000;
const url = "mongodb+srv://tabranchaud:tb@cluster0.h4cuw.mongodb.net/";

const dbconnection = new MongoClient(url);
let userCollection : Collection | null = null;
let recipeCollection : Collection | null = null;
let tagCollection : Collection | null = null;
let ingredientCollection : Collection | null = null;


// Basic route handler
app.get('/home', (req : Request , res : Response ) => {
    res.send("Send");
})

app.get("/recipes", (req: Request, res: Response) => {
    res.send("Send");
})

async function run() {
    await dbconnection.connect().then(() => console.log("Database Connected"));
    userCollection = await dbconnection.db("Ingredients").collection("Users");
    recipeCollection = await dbconnection.db("Ingredients").collection("Recipes");
    tagCollection = await dbconnection.db("Ingredients").collection("Tags");
    ingredientCollection = await dbconnection.db("Ingredients").collection("Ingredients");
    //const results = await userCollection.insertOne({"username": "Admin", "password": "Admin", "public": true, "favoritedRecipes": null});
    //console.log(results);
}

app.post('/postUser', async (req: Request, res: Response) => {
    console.log("Post User received");
    const insert = {
        username: req.body.username,
        password: req.body.password,
        isPublic: req.body.isPublic,
        favoritedRecipes: req.body.favoritedRecipes,
        aboutMe: req.body.aboutMe
    }
    try {
        let results;
        if (userCollection){
            results = await userCollection.findOne({username: insert.username})
        }
        if (results !== null){
            console.log("User already exists in collection");
            res.status(202).send("Username already exists in collection");
            return;
        }
    }
    catch (error){
        console.error(error);
        res.status(501).send("Error when adding user to collection");
    }
    try{
        let results;
        if (userCollection) {
            results = await userCollection.insertOne(insert);
        }
        console.log(results)
        res.status(201).send("User added to collection");
    }
    catch (error){
        console.error(error);
        res.status(500).send("Error when adding user to collection");
    }
})

app.post('/getUser', async (req: Request, res: Response) => {
    console.log("Get User Received")
    try {
        let user;
        if (userCollection){
            user = await userCollection.findOne({username: req.body.username});
        }
        console.log(user);
        res.send(user);
    }
    catch (error){
        console.error(error)
        res.status(500).send("Error when adding user to collection");
    }
})

app.post('/checkIfUserExists', async (req: Request, res: Response) => {
    console.log("Check if User Exists Received");
    try {
        if (userCollection) {
            const result = await userCollection.findOne({username: req.body.username});
            if (result === null) {
                res.status(201).send(false)
            }
            else{
                res.status(201).send(true)
            }
        }
    }
    catch (error){
        console.error(error);
        res.status(209).send(error)
    }
})

app.post('/modifyPublicStatus', async (req: Request, res: Response) => {
    console.log("Modify User's Public Status Received");
    try {
        if (userCollection) {
            await userCollection.findOneAndUpdate({username: req.body.username}, {
                $set: {
                    isPublic: req.body.isPublic
                }
            })
        }
        res.status(201).send("User public status has been updated to " + req.body.isPublic);
    }
    catch (error){
        console.error(error);
        res.status(203).send("Error changing public status on user");
    }
})

app.post('/modifyAboutMe', async (req: Request, res: Response) => {
    console.log("Modify AboutMe Received");
    try {
        if (userCollection) {
            const result = await userCollection.findOneAndUpdate({username: req.body.username}, {$set: {aboutMe: req.body.aboutMe}});
            res.status(201).send(true)
        }
        else {
            res.status(201).send(false)
        }
    }
    catch (error){
        console.error(error);
        res.status(212).send(error);
    }
})

app.post('/postRecipe', async (req: Request, res: Response) => {
    console.log("Post Recipe Received");
    console.log(req.body.recipe);
    const insert = {
        steps: req.body.recipe.steps,
        name: req.body.recipe.name,
        creator: req.body.recipe.creator,
        isPublic: req.body.recipe.isPublic,
        likes: req.body.recipe.likes,
        ingredients: req.body.recipe.ingredients,
        prepTime: req.body.recipe.prepTime,
        mealType: req.body.recipe.mealType,
        postDate: req.body.recipe.postDate,
        tags: req.body.recipe.tags,
        slug: req.body.recipe.slug,
        image: req.body.recipe.image
    }
    try {
        let results;
        if (recipeCollection) {
            results = await recipeCollection.insertOne(insert);
        }
        console.log(results);
        for (let i = 0; i < insert.tags.length; i++){
            const tag = await tagCollection.findOne({tag: insert.tags[i]});
            if (tag === null){
                await tagCollection.insertOne({tag: insert.tags[i]});
            }
        }
        res.status(201).send("Recipe Added to Collection");
    }
    catch (error){
        console.error(error);
        res.status(205).send("Recipe could not be added to Collection");
    }
})

app.post('/getRecipe', async (req: Request, res: Response) => {
    console.log("Get Recipe Received");
    try {
        let results;
        if (recipeCollection) {
            results = await recipeCollection.findOne({username: req.body.username, creator: req.body.creator});
        }
        if (results){
            console.log("Found Recipe");
            res.status(201).send(results);
        }
        else {
            console.log("Couldn't find recipe");
            res.status(201).send("Couldn't find recipe");
        }
    }
    catch (error){
        console.error(error);
        res.status(206).send("Error when searching for Recipe");
    }
})

app.get('/getAllRecipes', async (req: Request, res: Response) => {
    console.log("Get All Recipes Received");
    try {
        let results;
        if (recipeCollection) {
            results = await recipeCollection.find({ isPublic: true }).toArray();
        }
        if (results) {
            console.log("Found Recipes");
            res.status(200).send(results);
        } else {
            console.log("Couldn't find recipes");
            res.status(404).send("Couldn't find recipes");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error when searching for recipes");
    }
});

app.post('/getRecipeFromSlug', async (req: Request, res: Response) => {
    console.log("Get Recipe Received");
    try {
        let results;
        if (recipeCollection) {
            results = await recipeCollection.findOne({slug: req.body.slug});
        }
        if (results) {
            console.log("Found Recipe");
            res.status(201).json(results);
        } else {
            console.log("Couldn't find recipe");
            res.status(404).json({ error: "Couldn't find recipe" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error when searching for Recipe" });
    }
});

app.post('/getTags', async (req: Request, res: Response) => {
    console.log("Get Tags Received");
    try {
        let results;
        const tagList : string[] = [];
        if (tagCollection) {
            results = await tagCollection.find().toArray();
            for (let i = 0; i < results.length; i++){
                tagList.push(results[i].tag);
            }
        }
        console.log(tagList);
        res.status(201).send(tagList);
    }
    catch (error){
        console.error(error);
        res.status(206).send("Could not retrieve tags");
    }
})

app.post('/checkForSlug', async (req: Request, res: Response) => {
    console.log("Check For Slug Received");
    try {
        if (recipeCollection) {
            let result = await recipeCollection.findOne({slug: req.body.slug});
            if (result === null){
                res.status(201).send(true);
            }
            else {
                res.status(201).send(false)
            }
        }
    }
    catch (error){
        console.error(error);
        res.status(208).send(error);
    }
})

app.post('/getRecipesByTag', async (req: Request, res: Response) => {
    console.log("Get Recipes by Tag Received");
    if (req.body.user){
        try {
            let results;
            if (recipeCollection){
                const query = {tags: {$all: req.body.tags}, creator: req.body.user};
                results = await recipeCollection.find(query).toArray();
            }
            if (results){
                console.log("Found Recipes");
                res.status(201).send(results);
            } else {
                console.log("Couldn't find recipes");
                res.status(201).send("Couldn't find recipes");
            }
        } catch (error) {
        console.error(error);
        res.status(206).send("Error when searching for Recipe");
        }
    }
    else {
        try {
            let results;
            if (recipeCollection) {
                const query = {tags: {$all: req.body.tags}, isPublic: true};
                results = await recipeCollection.find(query).toArray();
            }
            if (results) {
                console.log("Found Recipes");
                res.status(201).send(results);
            } else {
                console.log("Couldn't find recipes");
                res.status(201).send("Couldn't find recipes");
            }
        } catch (error) {
            console.error(error);
            res.status(206).send("Error when searching for Recipe");
        }
    }
})

app.post('/getRecipesByUser', async (req: Request, res: Response) => {
    console.log("Get Recipes by User Received");
    try {
        if (recipeCollection) {
            const results = await recipeCollection.find({creator: req.body.username}).toArray();
            res.status(201).send(results);
        }
    }
    catch (error){
        console.error(error);
        res.status(210).send(error);
    }
})

app.post('/likeRecipe', async (req: Request, res: Response) => {
    console.log("Like Recipes Received");
    try {
        if (userCollection){
            const userResult = await userCollection.findOneAndUpdate({username: req.body.username}, {$addToSet: {favoritedRecipes: req.body.slug}});
        }
        if (recipeCollection) {
            const recipeResult = await recipeCollection.findOneAndUpdate({slug: req.body.slug}, {$inc: {likes: 1}});
        }
        res.status(201).send("Like Recipe and Added to User favorite list");
    }
    catch (error){
        console.error(error);
        res.status(207).send(error);
    }
})

app.post('/modifyRecipe', async (req: Request, res: Response) => {
    console.log("Modify Recipe Received");
    try {
        if (recipeCollection) {
            const num = await recipeCollection.findOne({slug: req.body.slug});
            const results = await recipeCollection.findOneAndReplace({slug: req.body.slug}, {
                steps: req.body.recipe.steps,
                name: req.body.recipe.name,
                creator: req.body.recipe.creator,
                isPublic: req.body.recipe.isPublic,
                likes: num.likes,
                ingredients: req.body.recipe.ingredients,
                prepTime: req.body.recipe.prepTime,
                mealType: req.body.recipe.mealType,
                postDate: req.body.recipe.postDate,
                tags: req.body.recipe.tags,
                slug: req.body.recipe.slug,
                image: req.body.recipe.image
            }, {upsert: true});
        }
        res.status(201).send(true);
    } catch (error) {
        console.error(error);
        res.status(211).send(false);
    }
})

app.post('/postIngredient', async (req: Request, res: Response) => {
    console.log("Post Ingredient Received");
    const insert = {
        name: req.body.ingredient.name,
        amount: req.body.ingredient.amount,
        unitOfMeasure: req.body.ingredient.unitOfMeasure,
        buyDate: req.body.ingredient.buyDate,
        username: req.body.ingredient.username
    }
    try {
        if (ingredientCollection) {
            const result = await ingredientCollection.findOne({name: insert.name, buyDate: insert.buyDate});
            if (result === null){
                const add = await ingredientCollection.insertOne(insert);
                res.status(201).send("Added New Ingredient");
            }
            else {
                const combine = await ingredientCollection.findOneAndUpdate({name: insert.name}, {$inc: {amount: insert.amount}});
                res.status(201).send("Combined with pre-existing Ingredient");
            }
        }
    }
    catch (error){
        console.error(error);
        res.status(213).send(error);
    }
})

app.post('/getIngredientsByUser', async (req: Request, res: Response) => {
    console.log("Get Ingredients By User Received");
    try {
        if (ingredientCollection) {
            const result = await ingredientCollection.find({username: req.body.username}).toArray();
            res.status(201).send(result);
        }
    }
    catch (error){
        console.error(error);
        res.status(214).send(error);
    }
})

const appRun = run();

// Start the server
app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
})
