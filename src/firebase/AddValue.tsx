import { db } from "../Helpers/db";
import { Database } from "./FirebaseHelper";

const database = new Database();
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1;
const day = currentDate.getDate();
let formattedDate;
if (month <= 9) {
  formattedDate = `${day}/0${month}/${year}`;
} else {
  formattedDate = `${day}/${month}/${year}`; // pega data atual e formata pra min
}

export class AddValue {
  productList = [];
  clientList = [];
  histList = [];
  operationList = [];

  async newList() {
    this.productList = [];
    this.clientList = [];
    this.histList = [];
    this.operationList = [];
  }

  async addNewProduct(desc: string) {
    const getLastId = await database.select(db.tipoProduto);
    const newObj = {
      TipoProdutoId: getLastId.length + 1,
      tipoProduto_descricao: desc,
      dataCadastro: formattedDate,
    };

    const newObjH = { Acao: "Cadastro" };

    this.productList.push(newObj);
    this.histList.push(newObjH);
  }

  async addNewClient(nome: string, telefone: string, endereco: number) {
    const getLastId = await database.select(db.cliente);
    console.log(getLastId);
    const newObj = {
      ClienteId: getLastId.length + 1,
      nome: nome,
      telefone: telefone,
      endereco: endereco,
      dataCadastro: formattedDate,
    };

    const newObjH = { Acao: "Cadastro" };

    this.clientList.push(newObj);
    this.histList.push(newObjH);
  }

  async addNewOperation(
    ClientId: number,
    TipoPagamentoId: number,
    TipoProdutoId: number,
    operation_descricao: string
  ) {
    const newObj = {
      ClienteId: ClientId,
      TipoPagamentoId: TipoPagamentoId,
      TipoProdutoId: TipoProdutoId,
      operation_descricao: operation_descricao,
      dataCadastro: formattedDate,
    };

    const newObjH = { Acao: "Cadastro" };

    this.operationList.push(newObj);
    this.histList.push(newObjH);
  }
}
