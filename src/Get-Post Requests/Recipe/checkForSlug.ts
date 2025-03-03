export async function CheckForSlug(slug: string){
    const json = {
        slug: slug
    }

    const body = JSON.stringify(json);

    const results = await fetch('https://final-project-ingenious-ingredients-3bdv.onrender.com/checkForSlug', {
        method: 'POST',
        body,
        headers: {"Content-Type": "application/json"}
    })

    return await results.json();
}