const cron = require('node-cron');

const startcronJobs = async (req, res) => {

    // cron.schedule('* * * * * *', () => {
    //     console.log('Running task every second');
    // });
    cron.schedule('30 10 2 6 *', () => {
        console.log('Running task on June 2 at 10:30 AM');
    });
    cron.schedule('30 10 * 6 *', () => {
        console.log('Running task daily at 10:30 AM in June');
    });
    cron.schedule('*/1 * * * *', () => {
        console.log('Running task every 1 minute');
    });
};

module.exports = { startcronJobs };
