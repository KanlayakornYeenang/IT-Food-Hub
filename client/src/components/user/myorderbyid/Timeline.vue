<template>
    <div class="d-flex py-16">
        <div class="order-tracking " :class="[order.order_status >= 0 ? 'completed' : '']">
            <span class="is-complete"></span>
            <p>กำลังรอคนรับรายการ<br><span></span></p>
        </div>
        <div class="order-tracking " :class="[order.order_status >= 1 ? 'completed' : '']">
            <span class="is-complete"></span>
            <p>กำลังจัดเตรียมอาหาร<br><span></span></p>
        </div>
        <div class="order-tracking " :class="[order.order_status >= 2 ? 'completed' : '']">
            <span class="is-complete "></span>
            <p>กำลังไปจัดส่งอาหาร<span></span></p>
        </div>
        <div class="order-tracking " :class="[order.order_status >= 3 ? 'completed' : '']">
            <span class="is-complete "></span>
            <p>จัดส่งเรียบร้อย<br><span></span></p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            //
        }
    },
    props: {
        order: {
            type: Object
        },
    }
}
</script>

<style scoped>
.order-tracking {
    text-align: center;
    width: 33.33%;
    position: relative;
    display: block;
}

.order-tracking .is-complete {
    display: block;
    position: relative;
    border-radius: 50%;
    height: 30px;
    width: 30px;
    border: 0px solid #AFAFAF;
    background-color: #f7be16;
    margin: 0 auto;
    transition: background 0.25s linear;
    -webkit-transition: background 0.25s linear;
    z-index: 2;
}

.order-tracking .is-complete:after {
    display: block;
    position: absolute;
    content: '';
    height: 14px;
    width: 7px;
    top: -2px;
    bottom: 0;
    left: 5px;
    margin: auto 0;
    border: 0px solid #AFAFAF;
    border-width: 0px 2px 2px 0;
    transform: rotate(45deg);
    opacity: 0;
}

.order-tracking.completed .is-complete {
    border-color: #27aa80;
    border-width: 0px;
    background-color: #27aa80;
}

.order-tracking.completed .is-complete:after {
    border-color: #fff;
    border-width: 0px 3px 3px 0;
    width: 7px;
    left: 11px;
    opacity: 1;
}

.order-tracking p {
    color: #A4A4A4;
    font-size: 16px;
    margin-top: 8px;
    margin-bottom: 0;
    line-height: 20px;
}

.order-tracking p span {
    font-size: 14px;
}

.order-tracking.completed p {
    color: #000;
}

.order-tracking::before {
    content: '';
    display: block;
    height: 3px;
    width: calc(100% - 40px);
    background-color: #f7be16;
    top: 13px;
    position: absolute;
    left: calc(-50% + 20px);
    z-index: 0;
}

.order-tracking:first-child:before {
    display: none;
}

.order-tracking.completed:before {
    background-color: #27aa80;
}
</style>