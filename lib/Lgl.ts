

export interface Env {
    props: object
}

export interface Query {
    query: object
}

export interface Response {
    as_string: string;
    version: string;
}

export function reasoner (myenv: Env,
                          myquery: Query) : Response {
    return { as_string: "it depends",
             version: "0.0.1"
           }
}

