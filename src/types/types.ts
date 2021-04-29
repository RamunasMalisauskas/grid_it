export type StateType = {
  appState: {
    errorMsg: string;
    loading: boolean;
    sideBar: string;
    sideBarContent: string;
    classMenu: string;
    resetMenu: string;
    modalState: string;
  };
  canvaState: {
    canvasData: CellDataType[];
    classData: ClassType[];
    className: string;
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

export type CanvasPosition = {
  x: number;
  y: number;
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
      info?: string;
      cellName?: string;
    };
  };
  x: number;
  y: number;
};

export type CellHistory = {
  name: string;
  color: string;
  createdAt: string;
  data: {
    value: number;
    text?: string;
    info?: string;
  };
};

export type postDataType = {
  x: number;
  y: number;
  userName: string;
  userColor: string;
  cellData: {
    className?: string;
    value: number;
    cellName?: string;
  };
};

export type ClassType = {
  name: string;
  position: {
    x: number;
    y: number;
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
  position = "position",
  modal = "modal",
}

export enum menuState {
  open = "open",
  close = "close",
}

export enum sideBarContentState {
  addCell = "addCell",
  addClass = "addClass",
}

export enum dbCollections {
  classInfo = "classInfo",
  users = "users",
}

export enum error {
  empty = "",
  allmostMax = "You're about to reach maximum capacity of cells",
  maxCells = "Maximum capacity of cells has been reached. Remove some of if",
  missedPass = "Passwords are mistmatched",
  missedEmail = "Emails are mistmatched",
  fillInputs = "Please enter required info to add a cell",
  noData = "There is no cell data found",
  classExist = "The name of the class is alrady taken",
  success = "Added successfuly",
  passReset = "Instructions how to reset your password has been send to your email",
}
