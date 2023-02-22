

window.addEventListener('load', () => {
    //Uses ids that was created in html 
	const form = document.querySelector("#new-task-form");
	const input = document.querySelector("#new-task-input");
	const list_el = document.querySelector("#tasks");

	form.addEventListener('submit', (e) => {
		e.preventDefault();//stop the page from refreshing after submitting task



		const task = input.value;
        //Prevent user from submitting a empty task
        if (!task) {
            alert("Please enter out the task!");
        }
            else {
                console.log("Success");
                
            }
        
        //Getting task elements to display on page by creating DOM nodes
		const task_el = document.createElement("div");
		task_el.classList.add("task");

        
		const task_content_el = document.createElement("div");
		task_content_el.classList.add("content");
        //Set inner value to task 
        

        task_el.appendChild(task_content_el);

        const task_input_el = document.createElement("input");
        task_input_el.classList.add("text");
        task_input_el.type = "text";
        task_input_el.value = task;
        task_input_el.setAttribute("readonly", "readonly");

        task_content_el.appendChild(task_input_el)


        const task_actions_el = document.createElement("div");
        task_actions_el.classList.add("actions");

        const task_edit_el = document.createElement("button");
        task_edit_el.classList.add("edit");
        task_edit_el.innerHTML = "Edit";

        const task_delete_el = document.createElement("button");
        task_delete_el.classList.add("delete");
        task_delete_el.innerHTML = "Delete";


        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);

        task_el.appendChild(task_actions_el);


        list_el.appendChild(task_el);

        input.value = "";

        //Adding functionality for edit button
		task_edit_el.addEventListener('click', () => {
            if (task_edit_el.innerText.toLowerCase() == "edit")
            {
                //removing read only attribute to edit text
                task_input_el.removeAttribute("readonly");
                //automatically put our cursor where it needs to be
                task_input_el.focus();
                //Allows user to save new task after editing
                task_edit_el.innerText = "Save";
            }
            else {
                task_input_el.setAttribute("readonly","readonly");
                task_edit_el.innerText = "Edit";
            }



        });
        //Adds functionality for remove button
        task_delete_el.addEventListener("click", () =>  {

            list_el.removeChild(task_el);

        });

        
		})
	}) 

const timeElement = document.querySelector(".time");
const dateElement = document.querySelector(".date");

/**
 * @param {Date} date
 */
function formatTime(date) {
  const hours12 = date.getHours() % 12 || 12;
  const minutes = date.getMinutes();
  const isAm = date.getHours() < 12;

  return `${hours12.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} ${isAm ? "AM" : "PM"}`;
}

/**
 * @param {Date} date
 */
function formatDate(date) {
  const DAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  return `${DAYS[date.getDay()]}, ${
    MONTHS[date.getMonth()]
  } ${date.getDate()} ${date.getFullYear()}`;
}

setInterval(() => {
  const now = new Date();

  timeElement.textContent = formatTime(now);
  dateElement.textContent = formatDate(now);
}, 200);