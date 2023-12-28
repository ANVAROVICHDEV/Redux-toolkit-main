import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: "todo",
    initialState: {
        list: [],
    },

    reducers: {
        addTodo: (state , action) => {
            state.list = [action.payload , ...state.list];
        },
        deleteTodo: (state , action) => {
            state.list = state.list.filter(item => item.id!== action.payload);
        },
        checkedTodo: (state , action) => {
            state.list = state.list.map(item => (
                item.id === action.payload? {...item, checked: !item.checked } : item
            ));
        },
        editTodo: (state , action) => {
            state.list = state.list.map(item => (
                item.id === action.payload.id? {...item, title: action.payload.title } : item
            ));
        },
    }
})
export const {addTodo , deleteTodo , checkedTodo ,editTodo} = todoSlice.actions
export default todoSlice.reducer;