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

const model = {
    courseId: "CDU001",
    courseName: "Bachelor of Accounting (WACC01 - 2021)",
    courseCode: "590251",
    cricosCode: "060230M",
    studyArea: "Accounting",
    courseLevel: "Undergraduate",
    courseStudyModes: [
        {
            "studyMode": "Full-time",
            "duration": "3 year/s"
        }
    ],
    totalCreditPoints: "240",
    courseUnits: [
        {
            "unitType": "Core Units (16 units)",
            "creditPoints": "160 cp",
            "description": "",
            "unitList": [
                {
                    "code": "ACT102",
                    "title": "ACT102 - Introduction to Accounting",
                    "year": "2020",
                    "hours": null,
                    "creditPoints": "10",
                    "semester": [
                        {
                            "year": "2020",
                            "semester": "Semester 1",
                            "attendanceMode": "Internal",
                            "location": "CDU Sydney",
                            "learningMethod": "OLR"
                        }
                    ],
                    "sector": "Higher Education",
                    "discipline": "Accounting and Finance",
                    "prerequisites": "NA",
                    "incompatible": "ACT101, CMA101",
                    "assumedKnowledge": "NA",
                    "description": ""
                },
            ]
        },
        {
            "unitType": "Specialist Elective (0 units)",
            "creditPoints": "0 cp",
            "description": "Specialist Elective units are not required for this course.",
            "unitList": []
        },
        {
            "unitType": "Electives (6 units)",
            "creditPoints": "60 cp",
            "description": "Units totalling 60 credit points selected from undergraduate units offered by the University. When selecting electives choose units at a suitable level. A maximum of 20 credit points may be selected at 100 level as this course includes 80 credit points of compulsory 100 level units. Undergraduate units are coded at 100 to 300 level, therefore units coded as ACT1xx, ACT2xx and ACT3xx would be first, second and third year units respectively.",
            "unitList": []
        }
    ],
    isAvailableOnline: true,
    campuses: [
        {
            "type": "Offline",
            "campusName": "CDU Waterfront Darwin (CSP)",
            "postalAddress": null,
            "state": null,
            "geolocation": {
                "lat": null,
                "lan": null
            }
        },
    ],
    courseFees: [
        {
            "type": "Annual Fee",
            "amount": "$26,776.00",
            "studenType": "International"
        }
    ],
    institutionSpecificData: {
        "CDUCode": "WACC01"
    },
    courseLink: "https://www.cdu.edu.au/study/bachelor-accounting-wacc01-2021"
}