import axios from "axios";
import { apiUrl, urlDir, postHeader } from "./const";

export type postDataType = {
  x: number,
  y: number,
  userName: string,
  userColor: string,
  data?: string | {},
};

export const addToBoard = async ({ userName, userColor, x, y, data }: postDataType): Promise<number> => {
  try {
    const postData = {
      x: x,
      y: y,
      name: userName,
      color: userColor,
      data: data,
    };

    const post = await axios({
      method: "POST",
      url: `${apiUrl}${urlDir.Board}`,
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
