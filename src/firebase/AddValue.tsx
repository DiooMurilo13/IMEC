export class AddValue {
  clientList = [];
  histList = [];

  addNewClient(
    nome: string,
    telefone: string,
    endereco: number,
    meioPagamnento: string,
    hist: string
  ) {
    const newObj = {
      nome: nome,
      telefone: telefone,
      endereco: endereco,
      meioPagamnento: meioPagamnento,
    };

    const newObjH = { Acao: hist };

    this.clientList.push(newObj);
    this.histList.push(newObjH);
  }
}
