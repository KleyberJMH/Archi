const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const jsonFile='../../Data/DungList test.json'
main()
async function main() {
    let jsonData = JSON.parse(fs.readFileSync(jsonFile));
    let dungs = jsonData.dungs

    for (const dung of dungs) {
        console.log(dung.uniqueMonsters.split(',')[0])
        let url = 'https://dofuswiki.fandom.com/wiki/' + dung.uniqueMonsters.split(',')[0].trim().replace(' ', '_')
        console.log(url);
        try {
            let response = await axios.get(url)

            if (response.status === 200) {
                const html = response.data;
                const $ = cheerio.load(html);
                const $selected = $('[property="og:image"]');
                let url=$selected[0].attribs.content.substring(0, str.indexOf(".png")+4)
                console.log(url);
                dung.imgUrl=url;
                console.log(dung.imgUrl);
            } else {
                dung.imgUrl=""
            };


        } catch (error) {

        }

    }
    console.log(jsonData);
    fs.writeFileSync(jsonFile, JSON.stringify(jsonData))
}
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