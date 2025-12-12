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
    cron.schedule('*/5 * * * *', () => {
        console.log('Running task every 5 minutes');
    });
    cron.schedule('*/59 * * * *', () => {
        console.log('Running task every 59 minutes or 1 hour');
    });
};

module.exports = { startcronJobs };
