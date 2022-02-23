

enhanceQuery =  async({query})=>{
    let limit,sort={} ;

    if(query['limit']){
        limit = Number(query['limit'])
        delete query['limit']
 
    }
    if(query['sort']){
        sort[query.sort] = parseInt(query.value)
        delete query['sort']
        delete query['value']
 
    }  

    let modifiedQuery = {
        query,
        limit,
        sort
    }
    return modifiedQuery
    
 
 
 }
 
 module.exports = {
     enhanceQuery
 }