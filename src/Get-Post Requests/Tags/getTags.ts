export default async function GetTags(){
    const results = await fetch('https://final-project-ingenious-ingredients-3bdv.onrender.com/getTags', {
        method: 'POST',
        headers: {"Content-Type": "application/json"}
    })

    return await results.json();
}