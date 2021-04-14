import axios from "axios";
import { apiUrl, urlDir, postHeader } from "./const";

type deleteDataType = {
    id: string
};

export const deleteFromBoard = async ({ id }: deleteDataType): Promise<number> => {
    try {
        const postData = {
            id: id
        };

        const post = await axios({
            method: "POST",
            url: `${apiUrl}${urlDir.Delete}`,
            headers: postHeader,
            data: postData
        }
        );

        console.log(post.status);
        return await post.status
    } catch (err) {
        console.log(err);
        throw err
    }
};

