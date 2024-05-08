const cheerio = require('cheerio');
const fs = require('fs');
const Humanoid = require("humanoid-js");
const { setTimeout } = require("timers/promises");
const items = require('../../Data/Items test2.json')
main2()
async function main2() {
    let url = 'https://dofuswiki.fandom.com/wiki/'
    const humanoid = new Humanoid();
    let i=1;
    for (const item of items) {
        console.log(`Item ${i++} of ${items.length}`)
        try {
            
            const val = await humanoid.get(url + item.Name.replace(' ', '_'))
            if (val.statusCode != 200) continue
            const $ = cheerio.load(val.body)
            const $sel = $('a.image')
            item.ImgUrl2=$sel[0].attribs['href']
        } catch (error) {
            console.error(error);
        }
    }
    fs.writeFileSync('../../Data/Items test3.json', JSON.stringify(items))

}
async function main() {
    let url = '';
    try {
        let items = []
        const humanoid = new Humanoid();
        //get equipables
        url = `https://www.dofus-touch.com/en/mmorpg/encyclopedia/equipment?page=`;
        for (let i = 1; i <= 86; i++) {
            console.log(`*********Equipment page ${i}/86*********\r`);
            const val = await humanoid.get(url + i.toString())

            const $ = cheerio.load(val.body);
            const $sel = $('tbody tr')
            const map = $sel.map((i, p) => {
                return {
                    Name: p.children[3].firstChild.firstChild.firstChild.data,
                    Type: p.children[7].firstChild.data,
                    Level: p.children[9].firstChild.data.match(/\d+/)[0],
                    ItemId: p.children[1].firstChild.firstChild.attribs.href.split('/').slice(-1)[0].match(/\d+/)[0],
                    ImgUrl: '',
                    Stats: []
                }
            })
            const mapAr = map.toArray()
            items = items.concat(mapAr)
        }
        console.log('Equipment loaded')
        //get weappons
        url = `https://www.dofus-touch.com/en/mmorpg/encyclopedia/weapons?page=`
        for (let i = 1; i <= 31; i++) {
            console.log(`*********Weapons page ${i}/31*********\r`);
            const val = await humanoid.get(url + i.toString())
            const $ = cheerio.load(val.body);
            const $sel = $('tbody tr')
            const map = $sel.map((i, p) => {
                return {
                    Name: p.children[3].firstChild.firstChild.firstChild.data,
                    Type: p.children[7].firstChild.data,
                    Level: p.children[9].firstChild.data.match(/\d+/)[0],
                    ItemId: p.children[1].firstChild.firstChild.attribs.href.split('/').slice(-1)[0].match(/\d+/)[0],
                    ImgUrl: '',
                    Stats: []
                }
            })
            const mapAr = map.toArray()
            items = items.concat(mapAr)
        }
        console.log('Weapons loaded')

        console.log(`Total of ${items.length} items`);
        let y = 1;
        for (const item of items) {
            await setTimeout(1500)
            console.log(`Details of item ${y++} of ${items.length}\r`);
            const val = await humanoid.get('https://www.dofus-touch.com/es/linker/item?l=en&id=' + item.ItemId)
            if (val.statusCode != 200 || val.body.length < 10) {
                continue
            }
            else {
                const $ = cheerio.load(val.body)
                const $img = $('img')
                item.ImgUrl = $img[0].attribs.src
                const $stats = $('div.ak-title')
                const stats = $stats.map((i, p) => {
                    const extra = p.children[1]?.firstChild.data
                    const str = extra == undefined ? '' : p.children[1].firstChild.data
                    return p.firstChild.data.trim() + str
                })
                item.Stats = stats.toArray();
                console.log(stats);
            }
        }
        console.log(items);
        fs.writeFileSync('../../Data/Items test2.json', JSON.stringify(items))
    } catch (e) {
        console.error(e);
    }
}
