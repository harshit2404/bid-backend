//{ query: { username: 'harry244715' }, limit: undefined, sort: {} }

enhanceQuery =  async({query})=>{
    let skip,limit,sort={} ;

    if(query['limit']){
        limit = Number(query['limit'])
        delete query['limit']
 
    }
    if(query['skip']){
        skip = Number(query['skip'])
        delete query['skip']

    }
    if(query['sort']){
        sort[query.sort] = parseInt(query.value)
        delete query['sort']
        delete query['value']
 
    }  

    const key=Object.keys(query)[0]
    const value=Object.values(query)[0]
    const moQ = {}
    moQ["$regex"] = value
    moQ["$options"] = "i"
    query[key] = moQ
    

    let modifiedQuery = {
        query,
        limit,
        sort,
        skip
    }
    return modifiedQuery
    
 
 
 }
 
 module.exports = {
     enhanceQuery
 }