export async function ModifyAboutMe(user: string, aboutMe: string){
    const json = {
        username: user,
        aboutMe: aboutMe
    }

    const body = JSON.stringify(json);

    const result = await fetch('https://final-project-ingenious-ingredients-3bdv.onrender.com/modifyAboutMe', {
        method: 'POST',
        body,
        headers: {"Content-Type": "application/json"}
    })

    return await result.json();
}