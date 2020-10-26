const fs = require('fs')
const jsonfileData = require('./data.json') || []

const puppeteer = require('puppeteer');
const scrapurl = 'https://www.adelaide.edu.au/course-outlines/';
const scrapCourse = require('./scrapCourse');


(async () => {
    try {
        const jsonData = jsonfileData
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
            let courseData =  await scrapCourse.fetchCourseDetails(courseLink)
            console.log("Course Data Array: ", courseData);
        }


        await browser.close();
    } catch (error) {
        console.log(error)
    }
})();


// fs.writeFile('data.json', JSON.stringify("asda"), (err) => {
//     if (err) {
//         throw err;
//     }
//     console.log("JSON data is saved. url Index: ");
// });