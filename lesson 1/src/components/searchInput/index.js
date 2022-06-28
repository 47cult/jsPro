export default Vue.component('search-input', {
    model: {
        prop: 'value',
        event: 'input'
    },
    props: {
        value: String
    },
    template: `
    <input type="text"
            class="header__search"
            :value="value"
            @input="$emit('input', $event.target.value)"
    />
    `
})