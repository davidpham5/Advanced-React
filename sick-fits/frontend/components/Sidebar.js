import React from 'react'
import Pagination from './Pagination';
import styled from 'styled-components';

const SidebarStyles = styled.div`
  position: relative;
  aside { 
    position: fixed;
    top: 0
  }
`
const Sidebar = props => {
  const { page } = props;
  return (
    <SidebarStyles>
      <aside>
        
      </aside> 
    </SidebarStyles>
  )
}

export default Sidebar