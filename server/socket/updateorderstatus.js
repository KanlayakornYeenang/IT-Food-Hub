

const updateOrderStatus = (io) =>{
    console.log(
        "Socket is ready.... waiting for connection!"
    )
    io.on('connection', (socket) => {
        console.log('New client connected');
        socket.on('update_order_Status', async ({orderId, newState}) => {
            // code to update order Status

            //
            console.log(`Order ${orderId} state updated to ${newState}`);
            io.emit('order_updated', { orderId, newState });
        });

        io.emit('update_order_Status', { orderId: 1, newState: 'gearrwe ewe' });  
        socket.on('disconnect', () => {
        console.log('Client disconnected');
        });
    })
}

module.exports = updateOrderStatus