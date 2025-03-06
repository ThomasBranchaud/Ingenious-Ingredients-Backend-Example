export async function DeleteRecipe(slug: string): Promise<boolean> {

    const json = { slug: slug };
    const body = JSON.stringify(json);

    const results = await fetch('https://final-project-ingenious-ingredients-3bdv.onrender.com/deleteRecipe', {
        method: 'DELETE',
        body,
        headers: { "Content-Type": "application/json" }
    });

    if (!results.ok) {
        console.error(`Error deleting recipe: ${results.statusText}`);
        return false;
    }

    const response = await results.json();
    if (response.error) {
        console.error(response.error);
        return false;
    }

    return true;
}