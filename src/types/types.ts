export type StateType = {
  appState: {
    errorMsg: string;
    loading: boolean;
    sideBar: string;
  };
  canvaState: {
    canvasData: CellDataType[];
    dataLimit: false;
    canvasPosition: {
      x: number;
      y: number;
    };
  };
  userState: {
    userName: string;
    loginStatus: string;
  };
};

export type CellDataType = {
  _id: string;
  data: {
    name: string;
    color: string;
    createdAt: string;
    data: {
      value: number;
      text?: string;
    };
  };
  x: number;
  y: number;
};

export type postDataType = {
  x: number;
  y: number;
  userName: string;
  userColor: string;
  cellData: {
    value: number;
    info?: string;
  };
};

export type ActionType = {
  type: string;
  value: any;
};

export enum methods {
  post = "POST",
  get = "GET",
  delete = "DELETE",
}

export enum apiUrl {
  Board = "/board",
  BoardStatus = "/board/status",
  CellStatus = "/board/cell",
  Delete = "/board/cell/delete",
}

export enum log {
  in = "loggedIn",
  out = "loggedOut",
  reg = "register",
}

export enum storageItems {
  name = "userName",
  status = "status",
}

export enum sideBarState {
  open = "open",
  close = "close",
}

export enum error {
  empty = "",
  allmostMax = "You're about to reach maximum capacity of cells",
  maxCells = "maximum capacity of cells has been reached. Remove some of if",
  missedPass = "passwords are mistmatched",
  fillInputs = "Please enter required info to add a cell",
}
