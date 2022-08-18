import {AnyAction, Store} from 'redux';

let store:Store;

function setStore(value:Store)
{
  store = value;
}

function getStore():Store
{
  return store;
}

function dispatch(action:AnyAction)
{
  store.dispatch(action);
}
export default {
  setStore,
  getStore,
  dispatch,
}