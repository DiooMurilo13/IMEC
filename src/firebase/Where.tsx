import { condition, IWhere } from "../Helpers/Interfaces/Condition";

export class Where {
  list = [];

  add(collumn: string, condition: condition, value: string) {
    const newObj = {
      collumn: collumn,
      condition: condition,
      value: value,
    };

    this.list.push(newObj);
  }
}
