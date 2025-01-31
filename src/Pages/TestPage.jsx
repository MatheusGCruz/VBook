import React, {useState, useEffect, useContext} from 'react';

/**
 * Initializing Context
 */
const MessageContext = React.createContext();

/**
 * Creating provider with default state
 * - holds the state for the message used everywhere in the App
 * - takes children parameter because it needs to render the children of the context 
 * - updateMessage can be used from any child of provider and will update the global state 
 */
const MessageProvider = ({children}) => {
  const [message, setMessage] = useState('nothing yet');

  const updateMessage = (newMessage) => {
    setMessage(newMessage);
  }

  return (
    <MessageContext.Provider value={[message, updateMessage]}>
      {children}
    </MessageContext.Provider>
  )
}