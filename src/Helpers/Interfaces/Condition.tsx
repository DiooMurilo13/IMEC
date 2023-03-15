export enum condition {
  EQUALS = "==",
  NOT_EQUALS = "!=",
}

export interface IWhere {
  collumn: string;
  condition: condition;
  value: string;
}
