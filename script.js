const checkBoxList = document.querySelectorAll(".custom-checkbox");
const inputFields = document.querySelectorAll(".goal-input");
const errorLabel = document.querySelector(".error-label");
const progressVal = document.querySelector(".progress-bar-in");
const progressLabel = document.querySelector(".progress-label");

const allQuotes = [
    "Raise the bar by completing yours goals!",
    "Well began is half done!",
    "Just a step away, keep going",
    "Whoa! You just completed all the gaols, time for chill :p",
]


let allGoals = JSON.parse(localStorage.getItem("allGoals")) || {
    first: {
        name: "",
        completed: false
    },
    second: {
        name: "",
        completed: false
    },
    third: {
        name: "",
        completed: false
    },
}
let completedGoalsCount = Object.values(allGoals).filter((goal)=> goal.completed).length


progressVal.style.width = `${completedGoalsCount / 3 * 100}%`
progressVal.firstElementChild.innerText = `${completedGoalsCount}/3 completed`
progressLabel.innerText = allQuotes[completedGoalsCount]


checkBoxList.forEach((checkBox)=>{
    checkBox.addEventListener("click",(e)=>{
       const allGoalsAdded = [...inputFields].every((input)=>{
            return input.value
       })

       if(allGoalsAdded){
        checkBox.parentElement.classList.toggle("completed")
        const inputId = checkBox.nextElementSibling.id
        allGoals[inputId].completed = !allGoals[inputId].completed
        completedGoalsCount = Object.values(allGoals).filter((goal)=> goal.completed).length
        progressVal.style.width = `${completedGoalsCount / 3 * 100}%`
        progressVal.firstElementChild.innerText = `${completedGoalsCount}/3 completed`
        progressLabel.innerText = allQuotes[completedGoalsCount]
        localStorage.setItem("allGoals",JSON.stringify(allGoals))
       }else{
        errorLabel.parentElement.classList.add("show-error")
    }
    }) 

})

   inputFields.forEach((input)=>{

        input.value = allGoals[input.id].name 

        if(allGoals[input.id].completed){
            input.parentElement.classList.add("completed")
        }

        input.addEventListener("focus",()=>{
            errorLabel.parentElement.classList.remove("show-error")
        })
        
        input.addEventListener("input",(e)=>{
            if(allGoals[input.id].completed){
                input.value = allGoals[input.id].name
                return 
            }
            allGoals[input.id] = {
                name: input.value,
            }
            localStorage.setItem("allGoals",JSON.stringify(allGoals))
        })
})