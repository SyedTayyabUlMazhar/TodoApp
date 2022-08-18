const selectActionsQueue = (state:any) => {
  return state.SaveActionReducer.actionsQueue;
}

export default {
  selectActionsQueue,
}