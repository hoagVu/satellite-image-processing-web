import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react';

import CIcon from '@coreui/icons-react';

// sidebar nav config
import navigation from './_nav';
import { setClose } from '../redux/initReducer';

const TheSidebar = () => {
  const dispatch = useDispatch();
  const { sidebarShow } = useSelector((state) => state.accommodation, shallowEqual);
  return (
    <CSidebar show={sidebarShow !== 'responsive'} onShowChange={(val) => dispatch(setClose(val))}>
      <CSidebarBrand className="d-md-down-none" to="/">
        {/* <CIcon className="c-sidebar-brand-full" name="logo-negative" height={35} /> */}
        {/* <CIcon className="c-sidebar-brand-minimized" name="sygnet" height={35} /> */}
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
