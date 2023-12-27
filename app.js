
//Show table from button
const payrollTable = document.getElementById('PayrollTable')
const payrollButton = document.getElementById('NewPayroll')

payrollButton.addEventListener('click', () => {
    payrollTable.style.display = 'table'
    payrollButton.style.display = 'none'
}) 

//Get data from JSON file
let personnelList = [];

//Load the employee list from jSON
const loadEmployee = async()=>{
    try{
        const response = await fetch('db/employees.json');
        personnelList = await response.json();
        console.log(personnelList);

        displayEmployees(personnelList);
    }
    catch(e){
        console.log(e);
    }
};

//Display the employee list to the DOM
const displayEmployees = (employee)=>{
    const employeesTable = employee.map(function(employee){
        return `
        <tr>
        <th scope="col">${employee.id}</th>
                <td>${employee.firstName}</td>
                <td>${employee.lastName}</td>
                <td>$${employee.hw.toFixed(2)}</td>
                <td><input type="number" class="hours-worked" style="width:60px" min="0"> h</td>
                <td class="monthly-pay" fw-bold></td>
        </tr>`
    }).join("");

    document.getElementById("EmployeeTable").innerHTML = employeesTable;

    //Calculate the monthly pay
    monthlyPay();

    //Maximum wage
    const getEmployeesHW = employee.map((employee)=> employee.hw);
    let maxHW = calcMaxWage(getEmployeesHW).toFixed(2);
    document.getElementById("Max-wage").innerText = `$` + maxHW;

    //Minimum wage
    let minHW = calcMinWage(getEmployeesHW).toFixed(2);
    document.getElementById("Min-wage").innerText = `$` + minHW;

    //Average wage
    const getTotalHW = (total, hw) => total + hw;
    const getAvgHW = (arr) => arr.reduce(getTotalHW, 0) / arr.length;
    let avgHW = getAvgHW(getEmployeesHW).toFixed(2);
    document.getElementById("Avg-wage").innerText = `$` + avgHW;

};

loadEmployee();

function monthlyPay() {
    const hoursWorked = document.querySelectorAll('.hours-worked');
    console.log(hoursWorked)

    hoursWorked.forEach((workHour)=>{
        workHour.addEventListener('keyup', (e)=>{
            if(e.target.value === "" || e.target.value <= 0) {
                return;
            } else {
                console.log(e.target.value);
                if (e.key === 'Enter') {
                    const hour = e.target.value;
                    //console.log(e.target.parentElement.parentElement.children[3].innerText.substring(1))

                    const hourlyWage = Number(
                        e.target.parentElement.parentElement.children[3].innerText.substring(1)
                    );
                    
                    let monthlyPay = e.target.parentElement.parentElement.children[5];
                    const calcMonthlyPay = (hour * hourlyWage).toFixed(2)
                    console.log(calcMonthlyPay)
                    monthlyPay.innerText = `$` + calcMonthlyPay
                }
            }
        });
        
    })
}

//Utility functions
function calcMaxWage(arr) {
    return Math.max(...arr);
}

function calcMinWage(arr) {
    return Math.min(...arr);
}