import { WebPartContext } from "@microsoft/sp-webpart-base";  
import { sp } from "@pnp/sp/presets/all"; 

export class SPServices{
    public constructor(context:WebPartContext){
        sp.setup({
            spfxContext:context
        })
    }

    public getDialogListItems(litsName: string) {  
        let items = sp.web.lists.getByTitle(litsName)  
            .items  
            .select("Title,Age")
            .get();  
        return items;  
    } 


}