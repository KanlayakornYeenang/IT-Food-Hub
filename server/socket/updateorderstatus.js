const { updateOrderStatus_sql, showState,  getCustomerId } = require("../models/orders")
const {insertNoti, getNotiById}= require("../models/notification")
const updateOrderStatus =  async (io) =>{
    console.log(
        "Socket is ready.... waiting for connection!"
    )
    io.on('connection', (socket) => {
        console.log('New client connected');  
        socket.on('show_order_status', async ({orderId, newState}) => {
            console.log("show_order_status")
            // code to update order Status 
                const status = await showState(orderId)
            //
            console.log(`Order ${orderId} status: ${status}`);
            io.emit('show_order_status', { orderId, status });
        });
        socket.on('update_order_status', async ({orderId, newState}) => {
                console.log("newState",newState)
            // code to update order Status 
                const update = await updateOrderStatus_sql(orderId, newState)
                const status = await showState(orderId)

                const customerId = await getCustomerId(orderId)
                const cus_id = customerId[0].cus_id
            //
            console.log(`Order ${orderId} state updated to ${newState}`);
            console.log("status",status[0].order_status)
            const status_updated = status[0].order_status
            io.emit('order_updated', {orderId,status_updated});

            // for notification updated
            const updatenotification = await insertNoti(cus_id, orderId,status_updated)
            const getNoti  = await getNotiById(cus_id)
            io.emit('notification_updated', {getNoti, cus_id})
        });



        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    })
}


module.exports = updateOrderStatus