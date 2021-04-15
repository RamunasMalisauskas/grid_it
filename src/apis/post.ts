import axios from "axios";
import { apiUrl, urlDir, postHeader } from "./const";

export type postDataType = {
  x: number,
  y: number,
  userName: string,
  userColor: string,
  cellData: {
    value: number;
    text?: string
  },
};

export const addToBoard = async ({ userName, userColor, x, y, cellData }: postDataType): Promise<number> => {
  try {
    const postData = {
      x: x,
      y: y,
      name: userName,
      color: userColor,
      data: cellData,
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
