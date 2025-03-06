export async function UnlikeRecipe(username: string, slug: string){
    const json = {
        username: username,
        slug: slug
    }

    const body = JSON.stringify(json);

    const result = await fetch('https://final-project-ingenious-ingredients-3bdv.onrender.com/unlikeRecipe', {
        method: 'POST',
        body,
        headers: {"Content-Type": "application/json"}
    })

    return await result.json();
}