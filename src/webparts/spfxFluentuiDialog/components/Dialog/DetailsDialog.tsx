import * as React from 'react';  
import { Dialog, DialogFooter, DialogType } from 'office-ui-fabric-react/lib/Dialog';  
 
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';  
// import styles from './DetailsDialog.module.scss';  



export interface DetailsDialogProps {  
    children?: never[]  
    item: any;  
    open: boolean;  
    onClose: () => void  
  }

  export function DetailsDialog(props: DetailsDialogProps) {  

    function formatValue(val: string) {  
        return (val ? val : "-");  
      }  
      
      const { open, onClose, item } = props;  
      
      const dialogStyles = { main: { maxWidth: 800 } }; 

      const dialogDetails = [  
        { label: "EmployeeName", value: formatValue(item.Title) },  
        { label: "Age", value: formatValue(item.Age) },  
         
      ] 

      const dialogContentProps = {  
        type: DialogType.normal,  
        title: 'Item Details',  
      };  
      
      const handleClose = () => () => {  
        onClose();  
      };  
      
      const modalProps = {  
        isBlocking: true,  
      } 

      return(
        <Dialog  
      hidden={!open}  
      onDismiss={handleClose()}  
      dialogContentProps={dialogContentProps}  
      styles={dialogStyles}  
      modalProps={modalProps}>  
  
      {/* <div className={styles.detailsGrid}>   */}
      <div>
        {  
          dialogDetails.map(d =>  
            <>  
              <div>  
                <strong>{d.label}--</strong>  
              </div>  
              <div>{d.value}</div>  
            </>)  
        }  
      </div>  
      <DialogFooter>  
        <PrimaryButton onClick={handleClose()} >Save</PrimaryButton>
        <DefaultButton onClick={handleClose()} text="Cancel" />  
      </DialogFooter>  
    </Dialog> 
      )



  }

