const pjSch = require('../../models/general/pjSch')
const Humanoid = require("humanoid-js");
const cheerio = require('cheerio');

/**
 * 
 * @param {String} characterName 
 * @returns {pjSch}
 */
module.exports = async (characterName) => {
    const url = `https://www.dofus-touch.com/en/mmorpg/community/directories/character-pages?text="${characterName}"&character_level_min=20&character_level_max=200#jt_list`;

    try {
        const humanoid = new Humanoid();
        const val = await humanoid.get(url)
        const $ = cheerio.load(val.body);
        const $sel = $('tr.ak-bg-odd td')
        const pjname=$sel[1].children[0].children[0].data;
        const pjUrlId=$sel[1].children[0].attribs['href'].split('/').slice(-1)[0];
        const pjclass=$sel[2].children[0].children[0].data;
        const level=$sel[3].children[0].data
        const newPJSch = new pjSch({
            PJName:pjname,
            PjClass:pjclass,
            PjLvl:level,
            urlId:pjUrlId
        })
        console.log(JSON.stringify(newPJSch));
        return newPJSch
    } catch (error) {
        console.error(error);
        if (error.response) {
            console.error(error.response.data);
        }
    }
};