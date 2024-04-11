import axios from "axios"

export const searchQuery = (query)=> async(dispatch)=>{
    try {
        const response = await axios.post("/api/v1/search",{query});
        const data = await response.data;
        
        
        dispatch({
            type:"searchResults",
            webResults:data.webResults,
            imageResults:data.imgResults,
            mapResults:data.mapURL
        })

    } catch (error) {
        dispatch({
            type:"searchError",
            payload:error.response.data.message
        })
    }
}
export const crawl = (url)=>async(dispatch)=>{
    try {
        dispatch({
            type:"CrawlRequest"
        })
        
        await axios.post("/api/v1/crawl",{url})
      dispatch({
        type:"CrawlSuccess",
        
      })
        
    } catch (error) {
        dispatch({
            type:"CrawlError",
            payload:error.response.data.message
        })
    }
}