const puppeteer = require('puppeteer');
const uid = require('uid')
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
    this.courseId = uid(5)
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

// const model = {
//     courseId: "CDU001",
//     courseName: "Bachelor of Accounting (WACC01 - 2021)",
//     courseCode: "590251",
//     cricosCode: "00123M",
//     studyArea: "Accounting",
//     courseLevel: "Undergraduate",
//     courseStudyModes: [
//         {
//             "studyMode": "Full-time",
//             "duration": "3 year/s"
//         }
//     ],
//     totalCreditPoints: "NA",
//     courseUnits: [
//         {
//             "unitType": "Core Units (16 units)",
//             "creditPoints": "160 cp",
//             "description": "",
//             "unitList": [
//                 {
//                     "code": "ACT102",
//                     "title": "ACT102 - Introduction to Accounting",
//                     "year": "2020",
//                     "hours": null,
//                     "creditPoints": "10",
//                     "semester": [
//                         {
//                             "year": "2020",
//                             "semester": "Semester 1",
//                             "attendanceMode": "Internal",
//                             "location": "CDU Sydney",
//                             "learningMethod": "OLR"
//                         }
//                     ],
//                     "sector": "Higher Education",
//                     "discipline": "Accounting and Finance",
//                     "prerequisites": "NA",
//                     "incompatible": "ACT101, CMA101",
//                     "assumedKnowledge": "NA",
//                     "description": ""
//                 },
//             ]
//         }
//     ],
//     isAvailableOnline: null,
//     campuses: [
//         {
//             "type": "Offline",
//             "campusName": "CDU Waterfront Darwin (CSP)",
//             "postalAddress": null,
//             "state": null,
//             "geolocation": {
//                 "lat": null,
//                 "lan": null
//             }
//         },
//     ],
//     courseFees: [],
//     institutionSpecificData: {
//         "ADUCode": "NA"
//     },
//     courseLink: "https://www.cdu.edu.au/study/bachelor-accounting-wacc01-2021"
// }