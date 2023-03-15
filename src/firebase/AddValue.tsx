export class AddValue {
  clientList = [];
  histList = [];

  addNewClient(nome: string, sobrenome: string, celular: number) {
    const newObj = { Nome: nome, Sobrenome: sobrenome, Celular: celular };

    this.clientList.push(newObj);
  }

  addNewHist(Acao: string) {
    const newObj = { Acao: Acao };

    this.histList.push(newObj);
  }
}
