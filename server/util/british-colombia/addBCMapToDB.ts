import DB from "../../db/db"
import * as fs from "fs/promises"
import { from } from "linq-to-typescript"
import { ICandidatesBC } from "../../interfaces/json/british-colombia/IDistrict"
import { IMapBC } from "../../interfaces/json/british-colombia/IMapBC"

const collectionName = "British-Colombia-Map-2020"

const candidatesPerDistrctitPath = "./../../data/canada/british-colombia/2020/bc_candidates_per_district.json"
const mapPathJSON = "./../../data/canada/british-colombia/bc_electoral_map.json"

interface IPartyColors {
    [key: string]: string
}

const PartyColors: IPartyColors = {
    "BC Green Party": "#98c954",
    "BC Liberal Party": "#a41b13",
    "B.C. Vision": "#F2C01E",
    "BC NDP": "#f4a460",
    "Christian Heritage Party of B.C.": "#800020",
    "Communist Party of BC": "#cc2100",
    "Conservative": "#0000FF",
    "Independent": "#000000",
    "Libertarian": "#FFD700",
    "Rural BC Party": "#A020F0",
    "Wexit BC": "#7fc241",

} as const

interface ITalliedVotes {
    district: string,
    candidates: Array<ICandidates>
}

interface ICandidates { name: string, votes: number, party: string }

/**
 * This function adds the color of the winner in the region to the topoJson circoncription data
 * @param {ITopoJsonQuebec} topoJson 
 */
async function addWinnersColor(topoJson: IMapBC) {

    // Read topoJson file
    let generalResults = await fs.readFile(candidatesPerDistrctitPath)
    let data = JSON.parse(generalResults.toString()) as ICandidatesBC[]

    data.sort((a, b) => {
        return a.ED_ABBREVIATION.localeCompare(b.ED_ABBREVIATION);
    })

    // let talliedVotes: Array<ITalliedVotes> = []

    topoJson.objects.ELEC_DIST_polygon.geometries.forEach((geo) => {
        const allCandidates = data.filter(c => c.ED_ABBREVIATION === geo.properties.ED_ABBREV)
        const groupedCandidates = from(allCandidates).groupBy(c => c.CANDIDATE).toArray()
        let summedVoteCandidates: Array<ICandidates> = []

        groupedCandidates.forEach(c => {
            let sum = 0
            // toArray() Because of the grouping
            c.toArray().forEach(c => {
                sum += c.VOTES_CONSIDERED
            })
            summedVoteCandidates.push({ "name": c.key, "votes": sum, "party": c.toArray()[0].AFFILIATION })
        })

        summedVoteCandidates.sort((a, b) => {
            return a.votes > b.votes ? -1 : 1
        })

        let color = PartyColors[summedVoteCandidates[0].party]
        if (!color) color = "#000000"

        geo.properties.COLOR = color
    })
}

/**
 * This function saves the Cleaned topoJson data to MongoDB
 * @file [./data/topoJsonSimpleMaps.json]
 */
async function savetopojsonToDB() {
    try {
        // Read topoJson file
        let rawData = await fs.readFile(mapPathJSON)
        let topoJson = JSON.parse(rawData.toString()) as IMapBC
        console.log("GOT JSON")
        await addWinnersColor(topoJson)
        const db = new DB()
        // //Check Collection
        await db.dropAndCreateCollection(collectionName)
        await db.insertManyToCollection(collectionName, [topoJson])
        console.log("Done.");
    } catch (err) {
        console.log(err)
        process.exit(1)
    }

}

(async () => {
    await savetopojsonToDB()
    process.exit(0)
})()