

export interface World {
    as_string: string
    version?: string;
}

export interface Query {
    as_string: string
    version?: string;
}

export interface Response {
    as_string: string;
    version: string;
}

export function reasoner (myworld: World,
                          myquery: Query) : Response {
    return { as_string: "it depends",
             version: "0.0.1"
           }
}

