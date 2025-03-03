import {Recipe} from "../../../Classes/Recipe";

export async function PostRecipe(recipe: Recipe){
    const json = {
        recipe: recipe
    }

    const body = JSON.stringify(json);

    const results = await fetch('https://final-project-ingenious-ingredients-3bdv.onrender.com/postRecipe', {
        method: 'POST',
        body,
        headers: {"Content-Type": "application/json"}
    })

    const text = await results.text();
    return text === "Recipe Added to Collection";
}