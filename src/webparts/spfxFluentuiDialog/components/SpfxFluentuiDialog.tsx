import * as React from 'react';
import { ISpfxFluentuiDialogProps } from './ISpfxFluentuiDialogProps';
import styles from './SpfxFluentuiDialog.module.scss';
// import { escape } from '@microsoft/sp-lodash-subset';
// import { Label } from 'office-ui-fabric-react'; 
import { ISpfxUifabricDialogState } from './ISpfxUifabricDialogState';
import { DetailsDialog } from './Dialog/DetailsDialog';
import { SPServices } from '../../../Service/SPService';

export default class SpfxFluentuiDialog extends React.Component<ISpfxFluentuiDialogProps, ISpfxUifabricDialogState> {

  private _spService: SPServices;  
  
  constructor(props: ISpfxFluentuiDialogProps) {  
    super(props);  
    this.state = {  
      dialogItems: [],  
      openDialog: false,  
      selectedItem: {}  
    }  
    this._spService = new SPServices(this.props.context);  
  }  

  public openDialog(item:any) {  
    return function () {  
      this.setState({ selectedItem: item, openDialog: true });  
    }  
  }  
  
  public closeDialog() {  
    this.setState({ openDialog: false })  
  } 

  public async getDialogItems() {  
    let { listName } = this.props;  
    if (listName) {  
      let items = await this._spService.getDialogListItems(listName);  
      this.setState({ dialogItems: items });  
    }  
  } 

  public componentDidMount() {  
    this.getDialogItems();  
  }  
  
  public componentDidUpdate(prevProps: ISpfxFluentuiDialogProps) {  
    if (prevProps.listName !== this.props.listName) {  
      this.getDialogItems();  
    }  
  } 




  public render(): React.ReactElement<ISpfxFluentuiDialogProps> {
    

    return (
      <div>  
        {  
          this.state.dialogItems.length ?  
            <div className={styles.spfxUifabricDialog}>  
              <div>  
                <strong>{this.props.description ? this.props.description : ''}</strong>  
              </div>  
              <table className={styles.detailsTable}>  
                <thead>  
                  <th>Title</th>  
                  <th>Age</th>  
                   
                </thead>  
                <tbody>  
                  {  
                    this.state.dialogItems.map(i => (  
                      <tr>  
                        <td>{i.Title}</td>  
                        <td>{i.Age}</td>       
                         
                        <td><a href="#" onClick={this.openDialog(i).bind(this)}>More Details</a> </td>  
                      </tr>  
                    ))  
                  }  
                </tbody>  
              </table>  
              {  
                this.state.openDialog ?  
                  <DetailsDialog  
                    open={this.state.openDialog}  
                    item={this.state.selectedItem}  
                    onClose={this.closeDialog.bind(this)}  
                  >  
                  </DetailsDialog>  
                  : <></>  
              }  
            </div>  
            : <></>  
        }  
      </div>  
    );
  }
}
