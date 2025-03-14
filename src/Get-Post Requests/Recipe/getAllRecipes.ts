import { Recipe } from "../../../Classes/Recipe";

export default async function GetAllRecipes(): Promise<Recipe[]> {
    const results = await fetch('https://final-project-ingenious-ingredients-3bdv.onrender.com/getAllRecipes', {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    });

    if (!results.ok) {
        throw new Error(`HTTP error! status: ${results.status}`);
    }

    const recipeList: Recipe[] = [];
    const list = await results.json();
    for (let i = 0; i < list.length; i++) {
        recipeList.push(new Recipe(
            list[i].steps,
            list[i].name,
            list[i].creator,
            list[i].isPublic,
            list[i].prepTime,
            list[i].mealType,
            list[i].likes,
            list[i].postDate,
            list[i].ingredients,
            list[i].tags,
            list[i].slug,
            list[i].image
        ));
    }

    console.log("list of recipes: " + recipeList);
    return recipeList;
}