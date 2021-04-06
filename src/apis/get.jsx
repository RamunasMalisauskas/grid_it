import axios from "axios";
import { apiUrl, urlDir } from "./const";

// interface fetchPromiseDataType {
//   data: { name: "string", color: "string", createdAt: "string" }
//   x: number
//   y: number
// }

// type fetchPromise = {
//   fetchData: fetchPromiseDataType[]
// }

export const fetchBoardCanva = async () => {
  try {
    // canvas location from local storage / input
    const canvasLocation = "?x=0&y=0&w=50&h=50";

    const getBoard = await axios.get(
      `${apiUrl}${urlDir.Board}${canvasLocation}`
    );

    return await getBoard.data;
  } catch (err) {
    return err;
  }
};

export const fetchBoardStatus = async () => {
  try {
    const getBoard = await axios.get(`${apiUrl}${urlDir.BoardStatus}`);
    // latest version(update) of board
    return await getBoard.data[0].update;
  } catch (err) {
    return err;
  }
};

export const fetchCellStatus = async () => {
  try {
    const getBoard = await axios.get(`${apiUrl}${urlDir.BoardStatus}`);
    // latest version(update) of board
    return await getBoard.data[0].update;
  } catch (err) {
    return err;
  }
};
