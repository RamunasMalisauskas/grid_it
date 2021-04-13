import axios from "axios";
import { apiUrl, urlDir } from "./const";

export type canvaDataType = {
  _id: string;
  data: { name: string, color: string, createdAt: string, }
  x: number;
  y: number;
}

type boardStatusType = number


export const fetchCanvaData = async (): Promise<canvaDataType[]> => {
  try {
    // canvas location from local storage / input
    const canvasLocation = "?x=0&y=0&w=20&h=20";

    const getBoard = await axios({
      method: "GET",
      url: `${apiUrl}${urlDir.Board}${canvasLocation}`
    }

    );

    return await getBoard.data;
  } catch (err) {
    console.log(err)
    return err;
  }
};

export const fetchBoardStatus = async (): Promise<boardStatusType> => {
  try {
    const getBoard = await axios({
      method: "GET",
      url: `${apiUrl}${urlDir.BoardStatus}`
    });
    // latest version(update) of board
    return await getBoard.data[0].update;
  } catch (err) {
    return err;
  }
};

export const fetchCellStatus = async () => {
  try {
    const getBoard = await axios({
      method: "GET",
      url: `${apiUrl}${urlDir.BoardStatus}`
    });
    // latest version(update) of board
    return await getBoard.data[0].update;
  } catch (err) {
    return err;
  }
};
