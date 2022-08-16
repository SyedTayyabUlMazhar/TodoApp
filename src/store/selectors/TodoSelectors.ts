const selectTodos = (state:any) => {
  return state.TodoReducer.todos;
}

const selectTodosLength = (state:any) => {
  return selectTodos(state).length;
}
export default {
  selectTodos,
  selectTodosLength,
}