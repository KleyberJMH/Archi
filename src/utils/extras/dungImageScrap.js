const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const ScrapPJInfo = require('./ScrapPJInfo');
const jsonFile='../../Data/DungList test.json'
const Humanoid = require("humanoid-js"); 

main()
async function main() {
   // let jsonData = JSON.parse(fs.readFileSync(jsonFile));
   // let dungs = jsonData.dungs

  
        const url=`http://www.dofus-touch.com/es/mmorpg/comunidad/directorios/paginas-personajes?text=puig-antich&character_level_min=20&character_level_max=200#jt_list`
        
        console.log(url);
        try {
           // const humanoid = new Humanoid();

            //const val= await humanoid.get(url).then();
           // const val= await ScrapPJInfo("puig-antich")
           const x= await ScrapPJInfo('puig-antich')
            const $ = cheerio.load(val.body);
            const $sel=$('tr.ak-bg-odd td')
            console.log($sel[1].children[0].children[0].data)
            console.log($sel[2].children[0].children[0].data)
            console.log($sel[3].children[0].data)
            let response = await axios.get(url)

            if (response.status === 200) {
                const html = response.data;
                const $ = cheerio.load(html);
                const $selected = $('[property="og:image"]');
                let url=$selected[0].attribs.content.substring(0, str.indexOf(".png")+4)
                console.log(url);
            } else {
            };


        } catch (error) {
console.log(error);
        }

    }
    //console.log(jsonData);
   // fs.writeFileSync(jsonFile, JSON.stringify(jsonData))

/*
axios.get('https://dofuswiki.fandom.com/wiki/Nelween')
    .then((response) => {
        if(response.status === 200) {
        const html = response.data;
            const $ = cheerio.load(html);
            const $selected =$('[property="og:image"]');
            console.log($selected[0].attribs.content); 
    }
    }, (error) => console.log("ERROR"+error) );
    */