import axios from "axios";
import { baseUrl, apiUrl, postHeader, methods, canvasPosition } from "../constants/apiConstants";
import { postDataType } from '../types/types'

export const addToBoard = async ({ userName, userColor, x, y, cellData }: postDataType): Promise<number> => {
  try {
    const postData = {
      x: canvasPosition[0] + x,
      y: canvasPosition[1] + y,
      name: userName,
      color: userColor,
      data: cellData,
    };

    const post = await axios({
      method: methods.post,
      url: `${baseUrl}${apiUrl.Board}`,
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
