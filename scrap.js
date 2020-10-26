const puppeteer = require('puppeteer');
const scrapurl = 'https://www.adelaide.edu.au/course-outlines/';
const scrapCourse = require('./scrapCourse');

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(scrapurl, { waitUntil: 'domcontentloaded' });
        await page.waitForSelector('.list-2')

        let data = await page.$$('div[class="subsections"] > ul > li > a')

        for (const course of data) {
            const link = await course.getProperty('href')
            const courseLink = await link.jsonValue()
            const courseName = await course.$eval('b', b => b.innerHTML);
            // console.log({ courseName, courseLink })
            scrapCourse.fetchCourseDetails(courseLink, (courseData) => {
                console.log("Course Data Array: ", courseData);
            })
        }


        await browser.close();
    } catch (error) {
        console.log(error)
    }
})();