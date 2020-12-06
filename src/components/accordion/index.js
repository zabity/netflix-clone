import React, { createContext, useState, useContext } from 'react';
import { Container, Body, Title, Item, Header, Inner} from './styles/accordion';

const ToggleContext = createContext();


export default function Accordion({ children, ...restProps }) {
  return (
    <Container {...restProps}>
      <Inner>{children}</Inner>
    </Container>
  );
}

Accordion.Title = function AccordionTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>
}

Accordion.Item = function AccordionItem({ children, ...restProps }) {
  const [toggleShow, setToggleShow] = useState(false);

  return (
    <ToggleContext.Provider value={{ toggleShow, setToggleShow }}>
      <Item {...restProps}>
        {children}
      </Item>
    </ToggleContext.Provider>
  )
}

Accordion.Header = function AccordionHeader({ children, ...restProps }) {
  const { toggleShow, setToggleShow } = useContext(ToggleContext);

  return (
    <Header
      onClick={() => setToggleShow((toggleShow) => !toggleShow)}  // this rather than just !toggleShow to prevent 1% situation
      {...restProps}
    >
      {children}
      {toggleShow ? (
        <img src="./images/icons/close-slim.png" alt="Close" />
      ) : (
        <img src="./images/icons/add.png" alt="Open" />
      )}
    </Header>
  );
}

Accordion.Body = function AccordionBody({ children, ...restProps }) {
  const {toggleShow} = useContext(ToggleContext);

return toggleShow ? <Body {...restProps}>{children}</Body> : null;
}