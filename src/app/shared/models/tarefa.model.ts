export class Tarefa {
    constructor(
        public tarefaId?: number,
        public nome?: string,
        public custo?: number,
        public dataLimite?: Date,
        public ordemApresentacao?: number
    ){}
}
