import axios from "axios";
import { apiUrl, urlDir, postHeader } from "./const";

export const addToBoard = async ({userName, userColor, x, y, data}) => {
  try {
    const postData = {
      x: x,
      y: y,
      name: userName,
      color: userColor,
      data: data,
    };

    const post = await axios.post(`${apiUrl}${urlDir.Board}`, postData, {
      headers: postHeader,
    });

    console.log(post.status);
  } catch (err) {
    console.log(err);
  }
};
