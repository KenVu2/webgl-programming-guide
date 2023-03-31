/**
 * \author Zachary Wartell
 */
import { readdirSync } from 'node:fs';


function echo(s)
{
    console.log(s);
}
// macOS, Linux, and Windows
let dirs=readdirSync('.',{withFileTypes:true});
const debug=false;

dirs=dirs.filter((d)=> d.isDirectory() & !d.name.match(/^\./));
//files=files.filter((f)=> f.match(/^[^.]/));

if(debug) console.log(dirs);
for (let d of dirs)
{
    let subDirs=readdirSync(d.name,{withFileTypes:true});
    subDirs=subDirs.filter((d)=> d.name.match(/.*\.html/));  

    if(debug)console.log(subDirs);
    if (subDirs.length !=- 0)
    {
        echo (`<li> ${d.name}`);
        echo (`<ul>`);
        for (let sd of subDirs)
        {
            echo(`<li> <a href="${d.name}/${sd.name}"> ${sd.name} </a> </li>`);
        }    
        echo (`</ul>`);
        echo (`</li>`);    
    }
}