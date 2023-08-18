import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
// import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'SpfxFluentuiDialogWebPartStrings';
import SpfxFluentuiDialog from './components/SpfxFluentuiDialog';
import { ISpfxFluentuiDialogProps } from './components/ISpfxFluentuiDialogProps';

export interface ISpfxFluentuiDialogWebPartProps {
  listName: string;  
  description: string;  
}

export default class SpfxFluentuiDialogWebPart extends BaseClientSideWebPart<ISpfxFluentuiDialogWebPartProps> {

  

  public render(): void {
    const element: React.ReactElement<ISpfxFluentuiDialogProps> = React.createElement(
      SpfxFluentuiDialog,
      {
        description: this.properties.description,
        listName:'EmployeeDetails',
        context:this.context
        
      }
    );

    ReactDom.render(element, this.domElement);
  }

  // protected onInit(): Promise<void> {
  //   return this._getEnvironmentMessage().then(message => {
  //     this._environmentMessage = message;
  //   });
  // }



  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),  
                PropertyPaneTextField('listName', {  
                  label: strings.ListNameFieldLabel  
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
