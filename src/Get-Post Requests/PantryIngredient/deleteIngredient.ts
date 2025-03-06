export async function DeleteIngredient(name: string, username: string){
    const json = {
        name: name,
        username: username
    }

    const body = JSON.stringify(json);

    const result = await fetch('https://final-project-ingenious-ingredients-3bdv.onrender.com/deleteIngredient', {
        method: 'DELETE',
        body,
        headers: {"Content-Type": "application/json"}
    })

    if (!result.ok) {
        console.error(`Error deleting ingredient: ${result.statusText}`);
        return false;
    }

    const response = await result.json();
    if (response.error) {
        console.error(response.error);
        return false;
    }


    return await result.json();
}