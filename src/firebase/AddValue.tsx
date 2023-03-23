export class AddValue {
  clientList = [];
  histList = [];

  addNewClient(
    clientesId: number,
    nome: string,
    telefone: string,
    endereco: number,
    dataCadastro: string,
    hist: string
  ) {
    const newObj = {
      ClientesId: clientesId,
      nome: nome,
      telefone: telefone,
      endereco: endereco,
      dataCadastro: dataCadastro,
    };

    const newObjH = { Acao: hist };

    this.clientList.push(newObj);
    this.histList.push(newObjH);
  }
}
