export interface IQCParty {
    numeroPartiPolitique: number;
    nomPartiPolitique: string;
    abreviationPartiPolitique: string;
    nbVoteTotal: number;
    tauxVoteTotal: number;
    nbCirconscriptionsEnAvance: number;
    tauxCirconscriptionsEnAvance: number;
    nbCandidat?: number;
}
