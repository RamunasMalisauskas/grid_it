export type StateType = {
  appState: {
    errorMsg: string;
    sideBar: string;
  };
  canvaState: {
    canvasData: CellDataType[];
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
