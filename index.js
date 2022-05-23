// Your code here
function createEmployeeRecord(infoArr) {
    const employee = {
        'firstName': infoArr[0],
        'familyName': infoArr[1],
        'title': infoArr[2],
        'payPerHour': infoArr[3],
        'timeInEvents': [],
        'timeOutEvents': []
    };
    return employee;
}

function createEmployeeRecords(nestedInfoArr) {
    const employees = nestedInfoArr.map(createEmployeeRecord);
    return employees;
}

const createTimeInEvent = (record, timeStamp) => {

    const timeObj = {
        type: "TimeIn",
        date: timeStamp.split(' ')[0],
        hour: parseInt(timeStamp.slice(-4), 10)
    }
    record.timeInEvents.push(timeObj)
    return record
}

const createTimeOutEvent = (record, timeStamp) => {

    const timeObj = {
        type: "TimeOut",
        date: timeStamp.split(' ')[0],
        hour: parseInt(timeStamp.slice(-4), 10)
    }
    record.timeOutEvents.push(timeObj)
    return record
}



const hoursWorkedOnDate = (record, date) => {
    const timeIn = record.timeInEvents.find( e => e.date === date ).hour;
    const timeOut = record.timeOutEvents.find (e => e.date === date ).hour;
    return (timeOut - timeIn) / 100;
}

const wagesEarnedOnDate = (record, date) => {
    return record.payPerHour * hoursWorkedOnDate(record, date);
}

const  allWagesFor = (record) => {
    const daysWorked = record.timeInEvents.map( e => e.date );
    const totalWages = daysWorked.reduce( (total, e) => total + wagesEarnedOnDate(record, e), 0 );
    return totalWages;
}

const calculatePayroll = (employees) => {
    const totalWages = employees.reduce( (total, e) => total + allWagesFor(e), 0 );
    return totalWages;
}

const findEmployeeByFirstName = (employees, firstName) => {
    const employee = employees.find( e => e.firstName === firstName );
    return employee;
} 