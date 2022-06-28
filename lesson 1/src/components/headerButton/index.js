export default Vue.component('custom-button', {
    template: `
        <button class = "header__button" type = "button" @click="$emit('click')">
            <slot></slot>
        </button>
    `
})