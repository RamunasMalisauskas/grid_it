export const baseUrl = "https://simutis.dev/api";

export const apiUrl = {
  Board: "/board",
  BoardStatus: "/board/status",
  CellStatus: "/board/cell",
  Delete: "/board/cell/delete",
};

export const postHeader = { "Content-Type": "application/json" };

export const canvasPosition = [2000, 2000]
export const canvasSize = [50, 50]

export enum methods {
  post = "POST",
  get = "GET",
  delete = "DELETE"
}
