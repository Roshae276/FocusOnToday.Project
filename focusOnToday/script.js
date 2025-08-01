// script.js

// Select all goal containers
// const goalContainers = document.querySelectorAll('.container-goal');

// goalContainers.forEach(container => {
//     const checkbox = container.querySelector('.custom-checkbox');
//     const icon = checkbox.querySelector('.check-icon');
//     const input = container.querySelector('.goal-input');

//     checkbox.addEventListener('click', () => {
//         // Toggle "completed" on the container
//         container.classList.toggle('completed');

//         // Optionally update placeholder or do more things
//     });
// });

const checkBoxList = document.querySelectorAll('.custom-checkbox');
const inputFields = document.querySelectorAll('.goal-input');
const errorLabel = document.querySelector('.please');
const progressLabel = document.querySelector('.progress-label');
const progressBar = document.querySelector('.progress-bar');
const progressValue = document.querySelector('.progress-value');

const allQuotes = [
    'Raise the bar by Completing your goals!',
    'Well begun it is half done!',
    'Just a step away , keep going!',
    'Whoa! You just completed all the goals , time for chill :D',
]

const allGoals= JSON.parse(localStorage.getItem('allGoals')) ||  {
  first: { name:'',
    completed:false,
},
    second: { name:'',
    completed:false,
},
     third: { name:'',
    completed:false,
}
}

let completedGoalsCount = Object.values(allGoals).filter(
    (goal) => goal.completed
).length

progressValue.style.width= `${(completedGoalsCount/inputFields.length) *100}%`;

progressValue.firstElementChild.innerText = `${completedGoalsCount}/${inputFields.length} completed`

progressLabel.innerText= allQuotes[completedGoalsCount]

checkBoxList.forEach((checkbox)=>{
    checkbox.addEventListener('click',(e)=>{
     const allGoalsAdded =   [...inputFields].every(function(input){
    return input.value
})

        if (allGoalsAdded) {
      checkbox.parentElement.classList.toggle('completed')
      const inputId = checkbox.nextElementSibling.id
      allGoals[inputId].completed = !allGoals[inputId].completed
      completedGoalsCount = Object.values(allGoals).filter(
        (goal) => goal.completed
      ).length
            
            progressValue.style.width= `${(completedGoalsCount/inputFields.length) *100}%`;
            
            progressValue.firstElementChild.innerText = `${completedGoalsCount}/${inputFields.length} completed`
            progressLabel.innerText = allQuotes[completedGoalsCount]

            localStorage.setItem('allGoals', JSON.stringify(allGoals));
        }else{
            progressBar.classList.add('show-error')
        }
        
    })
})
inputFields.forEach((input)=>{

    if(allGoals[input.id]){
        input.value = allGoals[input.id].name

         if (allGoals[input.id].completed) {
      input.parentElement.classList.add('completed')
    }
    }

    input.addEventListener('focus', ()=>{
        progressBar.classList.remove('show-error')
    })
    input.addEventListener('input', (e)=>{
        if(allGoals[input.id] && allGoals[input.id].completed){
        input.value = allGoals[input.id].name
        return
    }
         if (allGoals[input.id]) {
      allGoals[input.id].name = input.value
    } else {
      allGoals[input.id] = {
        name: input.value,
        completed: false,
      }
    }

        localStorage.setItem('allGoals', JSON.stringify(allGoals))
        
    })
})
