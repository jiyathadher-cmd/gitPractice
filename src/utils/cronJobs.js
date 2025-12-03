const cron = require('node-cron');
const { CdpDialog } = require('puppeteer');
const startcronJobs =async (req,res) => {
    cron.schedule('* * * * *',() => {
        console.log('Running every task at 1 seconds');
    });

    cron.schedule('30 10 2 6 4', ( ) => {
        console.log('Running an task within june wednesday 30 minutes 10 hours 2 days 6 month 4th day of the week');
    });

    cron.schedule('30 10 * 6 2', ()=>{
        console.log('Running an task within june and every dsy'); 
    });
    cron.schedule('*/1 * * * *',()=> {
        console.log('Runnign an task in one minute');
        
    })
}
