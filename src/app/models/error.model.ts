export interface ErrorCode {
  [key: string]: string;
}

export interface ErrorMsg {
  [key: string]: string;
}

export interface K4SError {
  code: string;
  message: string;
  detail?: string;
}
