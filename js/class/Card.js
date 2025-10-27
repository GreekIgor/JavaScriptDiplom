import {createCatalogItem} from "../components/card"

class Card{

    constructor (name, link, oldSum, Sum)
    {
        this.name = name
        this.link = link
        this.oldSum = oldSum
        this.Sum = Sum
    }


    render()
    {
    return  createCatalogItem(this)  
    }
}