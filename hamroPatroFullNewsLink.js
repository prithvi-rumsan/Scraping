let axios = require("axios");
let cheerio = require("cheerio");
let fs = require("fs");
let newsArray = [];
let fURL2,fTitle,fURL3,fSummary;
let URL = 'https://www.hamropatro.com/news';
console.log('URL1 : ' + URL);

async function getData(){
    await axios(URL)
        .then(response =>{
            if(response.status === 200){
                const html = response.data;
                const $ = cheerio.load(html);
                console.log('URL1 : ' + URL);
                $('.newsCard').each(function(i , elem ){
                    let URL2 = ('https://www.hamropatro.com' + ($(this).find('.newsInfo > h2 >a').attr('href')));
                    console.log('URL2 : ' +URL2);
                    console.log('Title : ' + $(this).find('.newsInfo > h2 > a').text().trim());
                    fURL2 = URL2;
                    fTitle = $(this).find('.newsInfo > h2 > a').text().trim();
                    fSummary = $(this).find('.newsSummary').text().trim();

                    gd(fTitle,fURL2,fSummary);

                    async function gd(fTitle,fURL2,fSummary){
                        console.log('inside gd() URL2 : ' +URL2);
                        await axios(URL2)
                            .then(response =>{
                                if(response.status === 200){
                                    const html = response.data;
                                    const $ = cheerio.load(html);
                                    console.log('URL2 : '+URL2 +' inside gd()');
                                    console.log('Main Link : ' + $('.newsCardDetails').find('.read-full > a').attr('href'));
                                    fURL3 = $('.newsCardDetails').find('.read-full > a').attr('href');
                                    console.log( fURL2 + fTitle + fURL3);
                                    newsArray.push({
                                        URL1 : URL,
                                        URL2 : fURL2,
                                        Title : fTitle,
                                        Summary : fSummary,                                        
                                        URL3 : fURL3                                        
                                    });
                                    fs.writeFileSync("./hamroPatroFullNewsLink.json", JSON.stringify(newsArray, null, 4));
                                }
                            })
                    }                    
                })
            }
        })
}
getData();