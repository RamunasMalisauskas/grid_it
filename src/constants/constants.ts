export const apiUrl = "https://simutis.dev/api";

export const urlDir = {
  Board: "/board",
  BoardStatus: "/board/status",
  CellStatus: "/board/cell",
  Delete: "/board/cell/delete",
};

export const postHeader = { "Content-Type": "application/json" };

export const canvasLocation = "?x=0&y=0&w=20&h=20";

export enum methods {
  post = "POST",
  get = "GET",
  delete = "DELETE"
}

export enum log {
  in = "loggedIn",
  out = "loggedOut",
  reg = 'register'
}

export enum localStorageItems {
  name = "userName",
  status = "status"
}

