import { handle } from '../common/promise'
import CartService from '../services/cart.service'

const state = {
    cart: {}
}

const mutations = {
    initCart(state) {
        state.cart = {}
    },
    update(state, data) {
        state.cart = data
    },
    clearCart(state) {
        state.cart = {}
    }
}

const actions = {
    async add({ commit }, product) {
        let [error, response] = await handle(
            CartService.add(product)
        )
        if (error) {
            error = new Error("Khong the them vao gio hang")
            throw error
        }
        commit('update', response.data.detail)
        console.log("giohang update", response)
        return response
    },
    async remove({ commit }, id) {
        let [error, response] = await handle(
            CartService.remove(id)
        )
        if (error) {
            error = new Error("Khong the xoa san pham")
            throw error
        }
        commit('update', response.data.detail)
        console.log("giohang remove", response)
        return response
    },
    async getAll({ commit }) {
        let [error, respone] = await handle(
            CartService.getAll()
        )
        if (error) {
            console.log("Chua dang nhap")
        } else {
            commit('update', respone.data.detail)
            return respone.data
        }

    },
}

const getters = {
    getCart(state) {
        return state.cart
    },
    numberOfItems(state) {
        return state.cart.length
    },
    isEmptyCart(state) {
        return Object.keys(state.cart).length === 0
    }
}

export const cart = {
    state,
    mutations,
    actions,
    getters
}