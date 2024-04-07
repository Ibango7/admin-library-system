import React,{FC, ReactNode} from 'react';
import styles from './style.module.scss';
 
interface HorizontalContainerProps{
    children:ReactNode
}
 
const ShelfRowContainer:FC<HorizontalContainerProps> =({children})=>{
    return (
        <div className={styles.scroller}>
        {children}
    </div>
    );
}
export default ShelfRowContainer;