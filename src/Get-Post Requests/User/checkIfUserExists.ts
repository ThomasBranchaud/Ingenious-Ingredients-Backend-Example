export async function CheckIfUserExists(username: string){
    const json = {
        username: username
    }

    const body = JSON.stringify(json);

    const results = await fetch('https://final-project-ingenious-ingredients-3bdv.onrender.com/checkIfUserExists', {
        method: 'POST',
        body,
        headers: {"Content-Type": "application/json"}
    })

    return await results.json();
}