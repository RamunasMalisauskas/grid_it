import axios from "axios";
import { apiUrl, baseUrl, postHeader, methods } from "../constants/apiConstants";

type deleteDataType = {
    id: string
};

export const deleteFromBoard = async ({ id }: deleteDataType): Promise<number> => {
    try {
        const postData = {
            id: id
        };

        // api requires post fetch to delete url in order to delete selected id
        const post = await axios({
            method: methods.post,
            url: `${baseUrl}${apiUrl.Delete}`,
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

