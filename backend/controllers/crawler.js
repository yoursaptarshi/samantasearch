const cheerio = require("cheerio")
const crawledModel = require("../models/Crawled")
const axios = require("axios")
const imgModel = require("../models/Crawledimg")
exports.crawler = async(req,res)=>{
try{
    const {url} = req.body;
    let checkUrl  = await crawledModel.findOne({url}); 
 if(checkUrl){
    res.status(400).json({
        success:false,
        message:"Url already  exists"
    })
 }
 else{
    const response =  await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
  
    const titles = [];
    const foundimgurls =[];
    const foundimgalts = [];
    
    await $('h1, h2').each((index,element)=>{
      titles.push($(element).text())
    });
    await $('img').each((index,element)=>{
        let imgurl= $(element).attr('src')
        if(imgurl && imgurl.startsWith('http')){
            foundimgurls.push($(element).attr('src'));
        foundimgalts.push($(element).attr('alt'));
        }     
    })
   
    for(let i=0;i<foundimgurls.length;i++){
        let imageurl = foundimgurls[i]
        let checkUrl = await imgModel.findOne({url:imageurl});
        
        if(!checkUrl){
            let u =  foundimgurls[i];
            let a =  foundimgalts[i];
           
            await imgModel.create({url:u,alt:a})
        }
    }
    for(let i=0;i<titles.length;i++){
        let t =titles[i]
        if(t!="" || t!="newsletter" || t!= "contact" || t!= "about"){
            await crawledModel.create({url:url,titles:t});
        }
    }
  
  res.status(200).json({
      success:true,
      message:"Crawled Successfully"
  })
 }
}
catch(error){
    res.status(500).json({
        success:false,
        message:error.message
    })
}
}

