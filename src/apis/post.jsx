import axios from 'axios';
import { apiUrl, urlDir, postHeader } from './const'



const userName = "Rami"
const userColor = "blue"



export const addToBoard = async () => {
    try {
        const postData = {
            x: 1004,
            y: 1002,
            name: userName,
            color: userColor
        }

        const post = await axios.post(`${apiUrl}${urlDir.Board}`, postData, {
            headers: postHeader
        })

        console.log(post.status)
    }
    catch (err) {
        console.log(err)
    }
}
