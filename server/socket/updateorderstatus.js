const { updateOrderStatus_sql, showState} = require("../models/orders")

const updateOrderStatus =  async (io) =>{
    console.log(
        "Socket is ready.... waiting for connection!"
    )
    io.on('connection', (socket) => {
        console.log('New client connected');  
        socket.on('update_order_Status', async ({orderId, newState}) => {
                console.log("newState",newState)
            // code to update order Status 
                const update = await updateOrderStatus_sql(orderId, newState)
                const status = await showState(orderId)
            //
            console.log(`Order ${orderId} state updated to ${newState}`);
            console.log("status",status[0].order_status)
            const status_updated = status[0].order_status
            io.emit('order_updated', {orderId,status_updated});
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    })
}


module.exports = updateOrderStatus