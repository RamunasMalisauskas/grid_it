import axios from "axios";
import { apiUrl, urlDir, canvasLocation, methods } from "./constants";
import { CellDataType } from '../types/types'

export const fetchCanvaData = async (): Promise<CellDataType[]> => {
  try {
    const getBoard = await axios({
      method: methods.get,
      url: `${apiUrl}${urlDir.Board}${canvasLocation}`
    }

    );

    return await getBoard.data;
  } catch (err) {
    console.log(err)
    return err;
  }
};

export const fetchBoardStatus = async (): Promise<number> => {
  try {
    const getBoard = await axios({
      method: methods.get,
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
      method: methods.get,
      url: `${apiUrl}${urlDir.BoardStatus}`
    });
    // latest version(update) of board
    return await getBoard.data[0].update;
  } catch (err) {
    return err;
  }
};
