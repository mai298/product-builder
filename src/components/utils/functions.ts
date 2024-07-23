/**
 * 
 * @param {string} txt 
 * @param {number} [max=50] 
 * @returns 
 */

export function txtSlicer(txt:string,max:number=50){
                    if(txt.length>=max)return `${txt.slice(0,max)}...`;
                    return txt;
}