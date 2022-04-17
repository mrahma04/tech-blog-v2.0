const logoutHandler = async () => {
    const res = await fetch('/api/users/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    })
    if (res.ok) {
        document.location.replace('/')
    } else {
        alert(response.statusText)
    }
}

document.querySelector('#logout').addEventListener('click', logoutHandler)