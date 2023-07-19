const { createRouter, createWebHashHistory } = VueRouter

import homePage from './pages/home-page.js'
import todoApp from './pages/todo-app.js'
import todoEdit from './pages/todo-edit.js'

const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/todos',
        component: todoApp
    },
    {
        path: '/edit',
        component: todoEdit
    },
    // {
    //     path: '/user',
    //     component: userDetails
    // },
]

export const router = createRouter({
    routes,
    history: createWebHashHistory()
})