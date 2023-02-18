const username = document.getElementById('username')
const password = document.getElementById('password')
const form = document.getElementById('form')
const error = document.getElementById('error')

localStorage.setItem('User1@gmail.com', "mypassw1")
localStorage.setItem('User2@gmail.com', "mypassw2")
localStorage.setItem('User3@gmail.com', "mypassw3")
localStorage.setItem('User4@gmail.com', "mypassw4")


function usernameIsValid(username) {
    return /^[a-zA-Z][0-9a-zA-Z_.-]+@gmail.com+$/.test(username);
}
$(form).on('submit', (e) => {
    let messages = []
    let pmessages = []

    ///Username conditions
    if (username.value == '') {
        messages.push("username is required")
    }
    else
    {
        if(!usernameIsValid(username.value)) {
            messages.push("insert a valid email")
        }
    }

    ///Password conditions
    if (password.value == '') {
        pmessages.push("password is required")
    }
    else if (password.value.length < 8) {
        pmessages.push("password should contain at least 8 characters")
    }
    else if(localStorage.getItem(username.value)) {
            if(password.value != localStorage.getItem(username.value)) {
                pmessages.push("password is not valid")
            }  
        }
    else { 
        pmessages.push("This account dosen't exist") 
    }
    if(messages.length > 0) {
        e.preventDefault()
        error.innerHTML = messages.join(', ')
        username.style.border = "2px solid #ff3860"
    } else {
        error.innerHTML = ''
        username.style.border = "2px solid #199719";
    }
    if(pmessages.length > 0) {
        e.preventDefault()
        perror.innerHTML = pmessages.join(', ')
        password.style.border = "2px solid #ff3860"
        $(perror).addClass("error");
        perror.style.color = " #ff3860"
        perror.style.fontSize = "13px"
    } else {
        //e.preventDefault()

        perror.innerHTML = 'Success'
        perror.style.color = "#199719"
        perror.style.fontSize = "20px"
        password.style.border = "2px solid #199719";
    }
})