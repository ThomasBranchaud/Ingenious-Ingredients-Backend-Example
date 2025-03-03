import {User} from "../../../Classes/User";

export async function GetUser(username: string) {

    const json =  {
        username: username
    }

    const body = JSON.stringify(json)

    const results = await fetch('https://final-project-ingenious-ingredients-3bdv.onrender.com/getUser', {
        method: 'POST',
        body,
        headers: {"Content-Type": "application/json"}
    })

    const user = await results.json();

    return new User(user.username, user.password, user.isPublic, user.favoritedRecipes, user.aboutMe);

}