import {BASE_URL, GET_GOODS_ITEMS, GOODS, GET_BASKET_GOODS_ITEMS} from "../../constants";
import { serviceWithBody } from "../../services";
export default Vue.component('good-item', {
    props: [
        'item'
    ],
    template: `
    <div class="catalog__item">
        <div class="catalog__item-img">product</div>
        <h3>{{ item.product_name }}</h3>
        <p>{{ item.price }}</p>
        <custom-button @click="addGood">Добавить</custom-button>
    </div>
    `,
    methods: {
            addGood() {
                serviceWithBody(GET_BASKET_GOODS_ITEMS, "POST", {
                    id: this.item.id
                })
            }
        }
})