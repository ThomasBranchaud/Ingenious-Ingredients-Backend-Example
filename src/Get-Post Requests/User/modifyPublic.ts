export async function ModifyPublic(username: string, isPublic: boolean) {
    const json = {
        username: username,
        isPublic: isPublic
    }

    const body = JSON.stringify(json);

    const results = await fetch('https://final-project-ingenious-ingredients-3bdv.onrender.com/modifyPublicStatus', {
        method: 'POST',
        body,
        headers: {"Content-Type": "application/json"}
    })

    console.log(await results.text());
}