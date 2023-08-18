import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ISpfxFluentuiDialogProps {
  description: string;
  listName: string;  
  context: WebPartContext;
}
