const request = require('request');

const team = ['gonzalo','amruta','fred','ljagasia','reinier.guerra'];
const startDate = new Date(2018, 9, 1);    // must be a Monday

/*
Today - startDate    Weeks elapsed
0-7                     0           team[0]
7-14                    1           team[1]
                        5
                        6           
*/  

let assignee = findThisWeeksAssignee();
if (assignee) {
    sendMessageToChannel(assignee);
}

function findThisWeeksAssignee() {
    var today = new Date();
    var weeksBetween = Math.floor(daysBetween(today, startDate) / 7);
    return team[weeksBetween % team.length];

    function daysBetween(date1, date2) {
        return (date1 - date2) / (1000 * 60 * 60 * 24);
    }
}

function sendMessageToChannel(assignee) {
    const webHookUrl = process.env.webHookUrl;
    const boilerplate = `Happy Monday! The TF watcher for this week is <@${assignee}>. Lucky you! Here is a helpful link https://gus.lightning.force.com/lightning/r/Report/00OB0000001zKHQMA2/view`
    console.log(boilerplate);
    const data = {
        text: boilerplate
    }

    request({
        url: webHookUrl, 
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

}