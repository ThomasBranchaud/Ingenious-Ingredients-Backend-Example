import {User} from "../../../Classes/User";

export async function PostUser(user: User) : Promise<boolean> {
    const newUser = {
        username: user.username,
        password: user.password,
        isPublic: user.isPublic,
        favoritedRecipes: user.favoritedRecipes,
        aboutMe: user.aboutMe
    }

    const body = JSON.stringify(newUser)

    const results = await fetch('https://final-project-ingenious-ingredients-3bdv.onrender.com/postUser', {
        method: 'POST',
        body,
        headers: {"Content-Type": "application/json"}
    })

    const res = await results.text()

    console.log(res)

    return res === "User added to collection";

}