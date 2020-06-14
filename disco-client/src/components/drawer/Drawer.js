import React from 'react';
import DrawerButton from '../../images/drawer-button.png';
import HideDrawer from '../../images/hide-drawer.png';

const Drawer = ({ bodyRef, hideDrawer, drawerDisplay, setDrawerDisplay }) => {

    if (drawerDisplay) { 

        bodyRef.current.style.filter = 'blur(1px)';

        return (
            <div className="drawer-container">
                <div id="close-drawer">
                    <button onClick={hideDrawer}>
                        <img src={HideDrawer} width={30} height={30} alt="hide drawer button" />
                    </button>
                </div>
                <p>Account Settings</p>
                <p>About</p>
                <p>Logout</p>
            </div>
        )
    }

    return (
        <img id="drawer" src={DrawerButton} alt="drawer button" 
            width={50} height={50} onClick={() => setDrawerDisplay(true)}
        />
    )
}

export default Drawer;