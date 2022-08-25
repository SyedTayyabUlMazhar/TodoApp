import { TodoType } from "../../containers/Home/TodoItem";

export type AddTodoPayload = { todo:TodoType };
export type UpdateTodoPayload = {id:string, updates:Partial<TodoType>};