
export interface ICirconscription {
    numeroCirconscription: number;
    nomCirconscription:    string;
    iso8601DateMAJ:        typeof Iso8601DateMAJ;
    nbBureauComplete:      number;
    nbBureauTotal:         number;
    nbVoteValide:          number;
    nbVoteRejete:          number;
    nbVoteExerce:          number;
    nbElecteurInscrit:     number;
    tauxVoteValide:        number;
    tauxVoteRejete:        number;
    tauxParticipation:     string;
    candidats:             Candidat[];
}

export interface Candidat {
    numeroCandidat:            number;
    nom:                       string;
    prenom:                    string;
    numeroPartiPolitique:      number;
    abreviationPartiPolitique: keyof typeof AbreviationPartiPolitique;
    nbVoteTotal:               number;
    tauxVote:                  number;
    nbVoteAvance:              number;
}

export const AbreviationPartiPolitique = {
    AFC: "A.F.C.",
    BMEBH: "B.M.-E.B.H.",
    CAQEFL: "C.A.Q.-E.F.L.",
    CQ: "C.Q.",
    DD: "D.D.",
    EA: "E.A.",
    Ind: "Ind",
    P51: "P51",
    PAPE: "P.A.P.E.",
    PCQCPQ: "P.C.Q./C.P.Q",
    PCQEED: "P.C.Q-E.E.D.",
    PCuQ: "P.Cu.Q.",
    PHQ: "P.H.Q.",
    PLQQLP: "P.L.Q./Q.L.P.",
    PLiQ: "P.Li.Q.",
    PMLQ: "P.M.L.Q.",
    PN: "P.N.",
    PQ: "P.Q.",
    PVQGPQ: "P.V.Q./G.P.Q.",
    QS: "Q.S.",
    UFF: "U.F.F.",
    UN: "U.N.",
} as const

export const Iso8601DateMAJ = {
    The20221006T1155412440400: "2022-10-06T11:55:41,244-04:00",
} as const
