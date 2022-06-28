export default Vue.component('basket-item', {
    props: [
        'item'
    ],
    template: `
    <li class="basket__item">
        <h2>{{ item.product_name }}</h2>
        <h3>{{ item.price }} руб.</h3>
        <button @click="$emit('add', item.id)">+</button>
        <p>{{ item.count }} шт.</p>
        <button @click="$emit('del', item.id)">-</button>
    </li>
    `
})