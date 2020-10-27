const fs = require('fs')
const puppeteer = require('puppeteer');
const uid = require('uid')
const jsonfileData = require('./data.json') || [];

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

        // console.log(courseDetails.length)
        // const courseData = []

        let courseName;
        let courseCode;
        let coordinatingUnit;
        let level;
        let contact;
        let courseDescription;
        let term;
        let location;
        let prerequisites;
        let courseLink = scrapurl

        for (const courseDetail of courseDetails) {
            const th = await courseDetail.$eval('th', th => th.innerHTML)
            const td = await courseDetail.$eval('td', td => td.innerHTML)

            if (th == "Course Code") {
                courseCode = td
            }
            if (th == "Course") {
                courseName = td
            }
            if (th == "Coordinating Unit") {
                coordinatingUnit = td
            }
            if (th == "Term") {
                term = td
            }
            if (th == "Level") {
                level = td
            }
            if (th == "Location/s") {
                location = td
            }
            if (th == "Contact") {
                contact = td
            }
            if (th == "Prerequisites") {
                prerequisites = td
            }
            if (th == "Course Description") {
                courseDescription = td
            }

            // courseData.push({ th, td })
            // console.log({ th, td })
        }

        await browser.close();
        let courseData = new courseModel(courseName,
            courseCode,
            coordinatingUnit,
            level,
            contact,
            courseDescription,
            term,
            location,
            prerequisites,
            courseLink)

        if (!jsonfileData.includes(courseData)) {
            jsonfileData.push(courseData)
            fs.writeFile('data.json', JSON.stringify(jsonfileData), (err) => {
                if (err) {
                    console.log(err);
                }
                console.log("JSON data is saved. Data: ",courseData);
            });
        }
        return
    } catch (error) {
        console.log(error)
    }
    // })();
}

const courseModel = function (
    courseName,
    courseCode,
    coordinatingUnit,
    level,
    contact,
    courseDescription,
    term,
    location,
    prerequisites = "NA",
    courseLink
) {
    this.courseId = "ADU-" + uid(5)
    this.courseName = courseName
    this.courseCode = courseCode
    this.cricosCode = "00123M"
    this.studyArea = coordinatingUnit
    this.courseLevel = level
    this.courseStudyModes = [
        {
            studyMode: "Full-time",
            duration: contact
        }
    ]
    this.totalCreditPoints = "NA"
    this.courseUnits = [
        {
            "unitType": "NA",
            "creditPoints": "NA",
            "description": courseDescription,
            "unitList": [
                {
                    "code": "NA",
                    "title": courseName,
                    "year": "2020",
                    "hours": null,
                    "creditPoints": "NA",
                    "semester": [
                        {
                            "year": "2020",
                            "semester": term,
                            "attendanceMode": "Internal",
                            "location": location,
                            "learningMethod": "NA"
                        }
                    ],
                    "sector": level,
                    "discipline": coordinatingUnit,
                    "prerequisites": prerequisites,
                    "incompatible": "NA",
                    "assumedKnowledge": "NA",
                    "description": courseDescription
                },
            ]
        }
    ]
    this.isAvailableOnline = null
    this.campuses = [
        {
            "type": "Offline",
            "campusName": location,
            "postalAddress": null,
            "state": null,
            "geolocation": {
                "lat": null,
                "lan": null
            }
        },
    ]
    this.courseFees = []
    this.institutionSpecificData = {
        "ADUCode": "NA"
    }
    this.courseLink = courseLink
}

