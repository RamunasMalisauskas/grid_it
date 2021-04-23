export const baseUrl = "https://simutis.dev/api";

export const apiUrl = {
  Board: "/board",
  BoardStatus: "/board/status",
  CellStatus: "/board/cell",
  Delete: "/board/cell/delete",
};

export const postHeader = { "Content-Type": "application/json" };

export const canvasLocation = "?x=100&y=100&w=20&h=20";

export enum methods {
  post = "POST",
  get = "GET",
  delete = "DELETE"
}
