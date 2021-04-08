import axios from "axios";
import { apiUrl, urlDir, postHeader } from "./const";

export const addToBoard = async (userName, userColor, x, y) => {
  try {
    const postData = {
      x: x,
      y: y,
      name: userName,
      color: userColor,
    };

    const post = await axios.post(`${apiUrl}${urlDir.Board}`, postData, {
      headers: postHeader,
    });

    console.log(post.status);
  } catch (err) {
    console.log(err);
  }
};
