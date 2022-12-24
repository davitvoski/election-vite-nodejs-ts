import React, { useEffect, useState, memo } from "react"
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps"
import { IGeometry, ITopoJson } from "../../../Types"

type MapChartProps = {
    setContentToolTip: (content: string) => void
    setTable: (geo: IGeometry) => void
}
function MapChart(props: MapChartProps) {
    const serverURL = "/election/quebec/map";
    const [geoJson, setGeoJson] = useState<ITopoJson>()

    useEffect(() => {
        const fetchData = async () => {
            let response = await fetch(serverURL)
            if (!response.ok) throw new Error("Failed to fetch data")

            let json = await response.json()
            setGeoJson(json)
        }
        fetchData().catch((err) => alert("We are having trouble connecting to the server. Please try again later."))
    }, [])

    return (
        <>
            <div id="regionName-tip" data-tooltip-content="Region Name">
                {geoJson ? <ComposableMap
                    style={{ width: "100%" }}
                    id="map" projection={"geoAlbers"}
                    projectionConfig={{
                        scale: 2050,
                        center: [28, 52]
                    }}
                    onMouseDown={e => e.preventDefault()}>
                    <ZoomableGroup width={1200}>
                        <Geographies geography={geoJson}>
                            {({ geographies }) =>
                                geographies.map((geo) => {
                                    return <Geography
                                        onMouseEnter={(e) => {
                                            e.preventDefault()
                                            props.setContentToolTip(`${geo.properties.NMTRI_CEP}`);
                                        }}
                                        onMouseLeave={(e) => {
                                            e.preventDefault()
                                            props.setContentToolTip("");
                                        }}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            props.setTable(geo)
                                        }}


                                        style={{
                                            default: {
                                                fill: geo.properties.COLOR,
                                                outline: "none"
                                            },
                                            hover: {
                                                fill: "#000000",
                                                outline: "none"
                                            },
                                            pressed: { outline: "none" },
                                        }}
                                        key={geo.rsmKey} geography={geo}
                                    />
                                })
                            }
                        </Geographies>
                    </ZoomableGroup>
                </ComposableMap> : <h1 className="w-full self-center text-center text-3xl">Loading...</h1>}
            </div>

        </>

    )
}
export default memo(MapChart)
