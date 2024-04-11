const crawledModel = require("../models/Crawled")
const imgModel = require("../models/Crawledimg")
const Nominatim = require('nominatim-geocoder')

exports.searchresults = async(req,res)=>{
    const {query} = req.body;
    const geocoder = new Nominatim()
        //Nominatim is the geocoding software that powers the official OSM site www.openstreetmap.org.
    
    try{
        // options i -> makes search in sensetive and .* *. means search the only query part from the whole title
        const webResults = await crawledModel.find({titles:{ $regex: `.*${query}.*`, $options: 'i' } });


        const imgResults = await imgModel.find({alt: { $regex: `.*${query}.*`, $options: 'i' }})


let url =`https://www.openstreetmap.org/export/embed.html?bbox=-1272.6562500000002%2C-89.96604055078522%2C1075.7812500000002%2C89.99993658267154&amp;layer=mapnik`
try {
   const response = await geocoder.search( { q: query } );
    const { boundingbox } = response[0];
        url = `https://www.openstreetmap.org/export/embed.html?bbox=${boundingbox[2]}%2C${boundingbox[0]}%2C${boundingbox[3]}%2C${boundingbox[1]}&amp;layer=mapnik`;
} catch (error) {
    url= `https://www.openstreetmap.org/export/embed.html?bbox=-1272.6562500000002%2C-89.96604055078522%2C1075.7812500000002%2C89.99993658267154&amp;layer=mapnik`;
}
       
    


        res.status(200).json({
            success:true,
            webResults:webResults,
            imgResults:imgResults,
            mapURL:url
        })
        
    }
    catch(error){
        res.status(200).json({
            success:false,
            message:error.message
        })
    }
}