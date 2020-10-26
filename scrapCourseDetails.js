const puppeteer = require('puppeteer');
// const scrapurl = 'https://www.adelaide.edu.au/course-outlines/107654/1/sem-1/';

module.exports.fetchCourseDetails = async (scrapurl) => {
    // (async () => {

        try {
            const browser = await puppeteer.launch({ headless: true });
            const page = await browser.newPage();
            await page.goto(scrapurl, { waitUntil: 'domcontentloaded' });
            // await page.waitForSelector(' ')

            let course = await page.$('table[class="light"] > tbody')
            let courseDetails = await course.$$('tr')

            console.log(courseDetails.length)
            const courseData = [] 

            for (const courseDetail of courseDetails) {
                const th = await courseDetail.$eval('th', th => th.innerHTML)
                const td = await courseDetail.$eval('td', td => td.innerHTML)

                courseData.push({ th, td })
                // console.log({ th, td })
            }

            await browser.close();
            return courseData
        } catch (error) {
            console.log(error)
        }
    // })();
}