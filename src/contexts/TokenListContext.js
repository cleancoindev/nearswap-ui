import React, { createContext, useReducer } from 'react';
import produce from 'immer';

let TokenListContext;

const TokenListProvider = ({ children }) => {

  let initialState = {tokens: window.tokens};

  TokenListContext = createContext(initialState);

  const { Provider } = TokenListContext;

  function reducer(state, action) {

    switch (action.type) {

      case 'SET_TOKEN_LIST_BALANCE':
        return produce(state, draft => {
          draft.tokens[action.payload.tokenIndex].balance = action.payload.balance;
        })

      default:
        throw new Error();
    };
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  // const [state, dispatch] = useThunkReducer((state, action) => {
  //   switch (action.type) {
  //     case 'SET_TOKEN_BALANCE':
  //       for (let token of state.tokens) {
  //         if (token.name == action.payload.name) {
  //           token.balance = action.payload.balance;
  //           return;
  //         }
  //       }
  //       // let updatedNearTokenList = updateNearBalances(state.tokens);
  //       // return { tokenList: updatedNearTokenList };
  //       break;

  //     // case 'FETCH_NEAR_BALANCES':
  //     //   let updatedNearTokenList = updateNearBalances(state.tokens);
  //     //   return { tokenList: updatedNearTokenList };
  //     //   break;

  //     case 'FETCH_ETH_BALANCES':
  //       let updatedEthTokenList = updateEthBalances(state.tokens, action.payload.w3.web3, action.payload.ethAccount);
  //       return { tokenList: updatedEthTokenList };
  //       break;

  //     default:
  //       throw new Error();
  //   };
  // }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
}

export { TokenListContext, TokenListProvider };
