export interface IMapBC {
    type: string
    arcs: number[][][]
    transform: Transform
    objects: Objects
  }
  
  export interface Transform {
    scale: number[]
    translate: number[]
  }
  
  export interface Objects {
    ELEC_DIST_polygon: ElecDistPolygon
  }
  
  export interface ElecDistPolygon {
    type: string
    geometries: Geometry[]
  }
  
  export interface Geometry {
    arcs: number[][]
    type: string
    properties: Properties
  }
  
  export interface Properties {
    ED_ID: number
    BDYSET_ID: number
    ED_ABBREV: string
    ED_NAME: string
    GAZETTE_DT: string
    AREA_SQM: number
    FEAT_PERIM: number
    SHP: any
    BJCTD: number
    COLOR?: string
  }
  