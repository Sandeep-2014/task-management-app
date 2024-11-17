const form = document.querySelector('form')
const addedTask = document.getElementById('addedTask')
const completedTasksList = document.getElementById('completedTasksList')
let myEditBtn = false
let updateIndes = null
let removeIndex = null
let ischeckTrue = null

let tasks = JSON.parse(localStorage.getItem('addTask')) || []
let completeTask = JSON.parse(localStorage.getItem('completedTasks')) || [];

if (tasks) {
    displayTask(tasks)
}

if (completeTask) {
    displayCompletedTask(completeTask)
}



form.addEventListener('submit', function (event) {
    event.preventDefault()
    let title = event.target.title.value
    let description = event.target.description.value
    let dueDate = event.target.due_date.value
    let priority = event.target.priority.value

    console.log(title);
    console.log(description);
    console.log(dueDate);
    console.log(priority);

    let tasks = JSON.parse(localStorage.getItem('addTask')) || []
    if (!tasks) {
        tasks = []
    }
    console.log(myEditBtn);
    console.log(updateIndes);

    console.log(myEditBtn);

    let completTaskArr = JSON.parse(localStorage.getItem('completedTasks')) || []
    // if (!completTaskArr) {
    //     completTaskArr = []
    // }

    if (myEditBtn === 'completedTasksData') {
        tasks.push({
            "title": title,
            "description": description,
            "dueDate": dueDate,
            "priority": priority
        })
        completTaskArr.splice(removeIndex, 1)
    } else if (myEditBtn === 'addTaskData') {
        tasks[updateIndes].title = title
        tasks[updateIndes].description = description
        tasks[updateIndes].dueDate = dueDate
        tasks[updateIndes].priority = priority
    } else {
        tasks.push({
            "title": title,
            "description": description,
            "dueDate": dueDate,
            "priority": priority
        })
    }
    myEditBtn = false
    // console.log(tasks);

    localStorage.setItem('addTask', JSON.stringify(tasks))
    displayTask(tasks)

    localStorage.setItem('completedTasks', JSON.stringify(completTaskArr))
    displayCompletedTask(completTaskArr)
    // event.target.reset();
})

function displayTask(tasksArr) {

    console.log(tasksArr);

    if (tasksArr.length > 0) {
        let finalAddedTask = '<h3>All Pending Tasks</h3>'
        tasksArr.forEach((task, i, arr) => {
            finalAddedTask += `
            <div class="content">
          <h5>Task Title</h5>
          <div>${task.title}</div>
        
          <h5>Description of the Task</h5>
          <div>${task.description}</div>
        
          <h5>Due Date</h5>
          <div>${task.dueDate}</div>
        
          <h5>Priority</h5>
          <div>${task.priority}</div>
        
          <div class="task-buttons">
            <button class="edit-btn">
              <i class="fa fa-edit"></i> 
            </button>
            <button class="delete-btn">
              <i class="fa fa-trash"></i> 
            </button>
            <button class="check-btn">
              <i class="fa-regular fa-square-check"></i> 
            </button>
          </div>
        </div>`
        });
        addedTask.innerHTML = finalAddedTask
        let editBtn = document.querySelectorAll(".edit-btn")
        editBtn.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                updateTask('addTask', index)
            })
        })
        console.log(editBtn);

        let deleteBtn = document.querySelectorAll('.delete-btn')
        deleteBtn.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                removeTask('addTask', index, displayTask, addedTask)
            })
        })

        let checkBtn = document.querySelectorAll('.check-btn')
        checkBtn.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                ischeckTrue = true
                completedTaskEvent('completedTasks', 'addTask', index)
            })
        })

        // console.log(addedTask);
    } else {
        addedTask.innerHTML = ''
    }

}

function updateTask(key, index) {
    let updateTasks = JSON.parse(localStorage.getItem(key)) || [];
    let titleInput = document.getElementById('title')
    let descriptionInput = document.getElementById('description')
    let dueDateInput = document.getElementById('due_date')
    let priorityInput = document.getElementById('priority')

    titleInput.value = `${updateTasks[index].title}`
    descriptionInput.value = `${updateTasks[index].description}`
    dueDateInput.value = `${updateTasks[index].dueDate}`
    priorityInput.value = `${updateTasks[index].priority}`

    if (key === 'addTask') {
        myEditBtn = 'addTaskData'
        updateIndes = index
    } else if (key === 'completedTasks') {
        myEditBtn = 'completedTasksData'
        removeIndex = index
        // updateIndes = index
        // console.log(tasks);
    }
}

function removeTask(key, index, updateDisplay, removeDiv) {
    let removeTasks = JSON.parse(localStorage.getItem(key)) || [];
    console.log('this is the index', index);


    removeTasks.splice(index, 1)

    localStorage.setItem(key, JSON.stringify(removeTasks))
    console.log(removeTasks.length);
    if (removeTasks.length > 0) {
        console.log('display function executed');
        updateDisplay(removeTasks)
    } else {
        console.log('display funtion not executed');
        removeDiv.innerHTML = ''
    }

}

function completedTaskEvent(pushDataKey, removedDatakey, index) {
    let checkedData = JSON.parse(localStorage.getItem(pushDataKey)) || [];
    let removedData = JSON.parse(localStorage.getItem(removedDatakey)) || [];
    let removedtask = removedData.splice(index, 1)
    console.log(removedtask);

    let title = removedtask[0].title
    let description = removedtask[0].description
    let dueDate = removedtask[0].dueDate
    let priority = removedtask[0].priority

    console.log(title);
    console.log(description);
    console.log(dueDate);
    console.log(priority);

    checkedData.push({
        "title": title,
        "description": description,
        "dueDate": dueDate,
        "priority": priority
    })


    localStorage.setItem(removedDatakey, JSON.stringify(removedData))
    localStorage.setItem(pushDataKey, JSON.stringify(checkedData))

    console.log(checkedData);
    // console.log(tasks);
    if (ischeckTrue === true) {
        displayTask(removedData)
        displayCompletedTask(checkedData)
    } else if (ischeckTrue === false) {
        displayTask(checkedData)
        displayCompletedTask(removedData)
    }
}

function displayCompletedTask(tasksArr) {

    console.log(tasksArr);

    if (tasksArr.length > 0) {
        let finalAddedTask = '<h3>All Completed Task</h3>'
        tasksArr.forEach((task, i) => {
            finalAddedTask += `
            <div class="completeTaskcontent">
          <h5>Task Title</h5>
          <div>${task.title}</div>
        
          <h5>Description of the Task</h5>
          <div>${task.description}</div>
        
          <h5>Due Date</h5>
          <div>${task.dueDate}</div>
        
          <h5>Priority</h5>
          <div>${task.priority}</div>
        
          <div class="task-buttons">
            <button class="edit-btn1">
              <i class="fa fa-edit"></i> 
            </button>
            <button class="delete-btn1">
              <i class="fa fa-trash"></i> 
            </button>
            <button class="check-btn1">
              <i class="fa-regular fa-square-check"></i> 
            </button>
          </div>
        </div>`
        });
        completedTasksList.innerHTML = finalAddedTask
        // console.log(completedTasksList);
        let editBtn = document.querySelectorAll(".edit-btn1")
        editBtn.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                updateTask('completedTasks', index)
            })
        })
        console.log(editBtn);

        let deleteBtn = document.querySelectorAll('.delete-btn1')
        deleteBtn.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                removeTask('completedTasks', index, displayCompletedTask, completedTasksList)
            })
        })

        let checkBtn = document.querySelectorAll('.check-btn1')
        checkBtn.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                ischeckTrue = false
                completedTaskEvent('addTask', 'completedTasks', index)
            })
        })
    } else {
        completedTasksList.innerHTML = ''
    }

}

let priorityFilter = document.querySelector('#priority-filter')
let statusFilter = document.querySelector('#status-filter')
let dateFilter = document.querySelector('#due-date-filter')

priorityFilter.addEventListener('change', function () {
    let selectedValue = priorityFilter.value
    // console.log(selectedValue);
    filteredPriorityTasks(selectedValue)
})


statusFilter.addEventListener('change', () => {
    selectedValue = statusFilter.value
    // console.log(selectedValue);
    statusFilteredTasks(selectedValue)
})


dateFilter.addEventListener('change', () => {
    let selectedValue = dateFilter.value
    // console.log(selectedValue);
    filteredDataTasks(selectedValue)

})

// display task according to the filter

function filteredPriorityTasks(valueData) {
    addedTask.innerHTML = ''
    completedTasksList.innerHTML = ''
    let tasks = JSON.parse(localStorage.getItem('addTask'))
    let completeTask = JSON.parse(localStorage.getItem('completedTasks'))

    if (valueData === 'all') {
        displayTask(tasks)
        displayCompletedTask(completeTask)
    } else {

        let filterPendingTasks = tasks.filter((task) => {
            return task.priority == valueData
        })
        console.log(filterPendingTasks);
        let filterCompleteTask = completeTask.filter((task) => {
            return task.priority === valueData
        })
        console.log(filterCompleteTask);

        if (filterPendingTasks) {
            displayTask(filterPendingTasks)
        }

        if (filterCompleteTask) {
            displayCompletedTask(filterCompleteTask)
        }
    }


}




function statusFilteredTasks(valueData) {
    addedTask.innerHTML = ''
    completedTasksList.innerHTML = ''
    let tasks = JSON.parse(localStorage.getItem('addTask'))
    let completeTask = JSON.parse(localStorage.getItem('completedTasks'))
    if (valueData === 'all') {
        displayTask(tasks)
        displayCompletedTask(completeTask)
    } else if (valueData === 'pending') {
        displayTask(tasks)
    } else if (valueData === 'completed') {
        displayCompletedTask(completeTask)
    }

}


function filteredDataTasks(valueData) {
    let today = new Date();

    let tasks = JSON.parse(localStorage.getItem('addTask'))
    let completeTask = JSON.parse(localStorage.getItem('completedTasks'))
    addedTask.innerHTML = ''
    completedTasksList.innerHTML = ''
    if (valueData === 'all') {
        displayTask(tasks)
        displayCompletedTask(completeTask)

    } else if (valueData === 'today') {
        let todayDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let todayPendingTasks = tasks.filter((task) => {
            return task.dueDate === todayDate
        })

        let todayCompletedTask = completeTask.filter((task) => {
            return task.dueDate === todayDate
        })

        displayTask(todayPendingTasks)
        displayCompletedTask(todayCompletedTask)

    } else if (valueData === '7') {
        let pendingTasksArr = []
        let completedTaskArr = []
        for (let i = 0; i < 7; i++) {
            let currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() + i);

            let filteredCurrentPendingTask = tasks.filter((task) => task.dueDate === currentDate)
            if (filteredCurrentPendingTask.length > 0) {
                pendingTasksArr.push(...filteredCurrentPendingTask)
            }

            let fileredCurrentCompleteTask = completeTask.filter((task) => task.dueDate === currentDate)
            if (fileredCurrentCompleteTask.length > 0) {
                completedTaskArr.push(...fileredCurrentCompleteTask)
            }

        }
        // console.log(pendingTasksArr);
        // console.log(completedTaskArr);
        displayTask(pendingTasksArr)
        displayCompletedTask(completedTaskArr)
    }


}