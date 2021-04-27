import axios from "axios";
import { baseUrl, postHeader } from "../constants/apiConstants";
import { apiUrl, methods } from "../types/types";

type deleteDataType = {
  cellId: string;
};

export const deleteFromBoard = async ({
  cellId,
}: deleteDataType): Promise<number> => {
  try {
    const postData = {
      id: cellId,
    };

    // api requires post fetch to delete url in order to delete selected id
    const post = await axios({
      method: methods.post,
      url: `${baseUrl}${apiUrl.Delete}`,
      headers: postHeader,
      data: postData,
    });

    console.log(post.status);
    return await post.status;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
