import {Recipe} from "../../../Classes/Recipe";

export async function ModifyRecipe(recipe: Recipe, slug: string){
    const json = {
        recipe: recipe,
        slug: slug
    }

    const body = JSON.stringify(json);

    const result = await fetch('https://final-project-ingenious-ingredients-3bdv.onrender.com/modifyRecipe', {
        method: 'POST',
        body,
        headers: {"Content-Type": "application/json"}
    })

    return await result.json();
}