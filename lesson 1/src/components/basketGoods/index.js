import {BASE_URL, GET_GOODS_ITEMS, GOODS, GET_BASKET_GOODS_ITEMS} from "../../constants";
import { service, serviceWithBody } from "../../services";
export default Vue.component('basket-goods', {
    data() {
        return {
            basketGoodsItems: []
        }
    },
    template: `
        <div class="fixed-area">
            <div class="basket-card">
                <div class="basket-card__header">
                    <h1 class="basket-card__header__title">basket card</h1>
                    <div class="basket-card__header__delete-icon" @click="$emit('click')"></div>
                </div>
                <div class="basket-card__content">
                <ul class="basket__list">
                <basket-item v-for="item in basketGoodsItems" :item="item" @add="addGood" @del="deleteGood"></basket-item>
                </ul>
                </div>
            </div>
        </div>
        `,
        mounted() {
                service(GET_BASKET_GOODS_ITEMS).then((data) => {
                    this.basketGoodsItems = data;
                })
            },
        methods: {
                addGood(id) {
                    serviceWithBody(GET_BASKET_GOODS_ITEMS, "POST", {
                        id 
                }).then((data) => {
                    this.basketGoodsItems = data;
                })
                },
                deleteGood(id) {
                    serviceWithBody(GET_BASKET_GOODS_ITEMS, "DELETE", {
                        id 
                }).then((data) => {
                        this.basketGoodsItems = data
                    })
                }
            }
})
