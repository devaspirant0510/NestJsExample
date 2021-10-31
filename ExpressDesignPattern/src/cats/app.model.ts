
export interface CatType {
    id:string;
    name:string;
    age:number;
    friend:string[]|null;
}

export const Cats:CatType[]=[
    {
        id:"1",
        name:"acat",
        age:32,
        friend:null
    },
    {
        id:"2",
        name:"bcat",
        age:22,
        friend:['1','3']
    },
    {
        id:"3",
        name:"ccat",
        age:25,
        friend:['1']
    }
]
