const pjSch = require("../../models/general/pjSch")
const professionSchema=require("../../models/general/professionSch")
const Humanoid = require("humanoid-js");
const cheerio = require('cheerio');
/**
 * 
 * @param {String} urlID 
 * @param {String} guildId 
 * @param {String} userId 
 * @returns {pjSch}
 */
module.exports=async(urlID)=>{
    const url = `https://www.dofus-touch.com/en/mmorpg/community/directories/character-pages/${urlID}`;
    try {
        const humanoid = new Humanoid();
        const val = await humanoid.get(url)
        const $ = cheerio.load(val.body);


        const $name=$('div.ak-character-ornament span')
        const name=$name[0].firstChild.data

        const $level = $('span.ak-directories-level')
        const level=$level[0].firstChild.data.match(/\d+/)[0]
        
        const $pjClass = $('span.ak-directories-breed')
        const pjClass=$pjClass[0].firstChild.data.match(/\w+/)[0]

        const $jobs= $('div.ak-main-content')
        const jobs=[]
        for (let i = 1; i < $jobs.length-1; i++) {
            const j = $jobs[i];
            const jobName=j.children[3].children[1].children[1].firstChild.data.trim()
            const jobLvl=j.children[3].children[3].firstChild.data.match(/\d+/)[0],
            job=new professionSchema({
                professionLvl:jobLvl,
                professionName:jobName
            })
            jobs.push(job)
        }

        return new pjSch({
            PJName:name,
            PjLvl:level,
            PjClass:pjClass,
            Professions:jobs            
        })
        

        
    } catch (error) {
        console.log(error);
    }

 return pjSch   
}