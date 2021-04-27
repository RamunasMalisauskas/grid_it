import axios from "axios";
import { baseUrl, canvasSize } from "../constants/apiConstants";
import { CellDataType, apiUrl, methods } from "../types/types";

type getProps = {
  xposition: number;
  yposition: number;
};

export const fetchCanvaData = async ({
  xposition,
  yposition,
}: getProps): Promise<CellDataType[]> => {
  try {
    const getBoard = await axios({
      method: methods.get,
      url: `${baseUrl}${apiUrl.Board}?x=${xposition}&y=${yposition}&w=${canvasSize[0]}&h=${canvasSize[1]}`,
    });
    return await getBoard.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const fetchBoardStatus = async (): Promise<number> => {
  try {
    const getBoard = await axios({
      method: methods.get,
      url: `${baseUrl}${apiUrl.BoardStatus}`,
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
      method: methods.get,
      url: `${baseUrl}${apiUrl.BoardStatus}`,
    });
    // latest version(update) of board
    return await getBoard.data[0].update;
  } catch (err) {
    return err;
  }
};
