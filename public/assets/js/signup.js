const signupFormHandler = async (event) => {
    event.preventDefault()

    const username = document.querySelector('#username-signup').value.trim()
    const email = document.querySelector('#email-signup').value.trim()
    const password = document.querySelector('#password-signup').value.trim()

    if (username && email && password) {
        const res = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        if (res.ok) {
            console.log('Signup completed successfully')
            document.location.replace('/dashboard')
        } else {
            alert(res.statusText)
        }
    }
}

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler)