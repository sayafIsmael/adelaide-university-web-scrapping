const puppeteer = require('puppeteer');
const scrapCourseDetails = require('./scrapCourseDetails');
const scrapurl = "https://www.adelaide.edu.au/course-outlines/ug/aborig/";

module.exports.fetchCourseDetails = async (scrapurl, callback) => {
    // (async () => {

    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(scrapurl, { waitUntil: 'domcontentloaded' });
        // await page.waitForSelector(' ')

        let course = await page.$('div[class="ui-widget-search-results"] > ul');
        let year = await course.$eval('h2', h2 => h2.innerHTML)

        const courseData = []
        if (year.includes(2020)) {
            const courses = await course.$$('li > a');
            for (const course of courses) {
                const link = await course.getProperty('href');
                const courseLink = await link.jsonValue();
                // console.log({ courseLink });
                await scrapCourseDetails.fetchCourseDetails(courseLink);
                // courseData.push(courseDetails)
                // console.log("Course Data Array: ", courseData);
            }
        }

        await browser.close()
        // if (courseData.length) {
        //     return courseData
        // }
        return

    } catch (error) {
        console.log(error)
    }
    // })();
}