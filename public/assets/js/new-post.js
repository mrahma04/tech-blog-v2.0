console.log('hello from new-post.js')

const newFormHandler = async (event) => {
    event.preventDefault()
    const title = document.querySelector('#post-title').value.trim()
    const post_content = document.querySelector('#post-content').value.trim()

    const res = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            title,
            post_content
        }),
        headers: { 'Content-Type': 'application/json' }
    })

    if (res.ok) {
        console.log(res)
        document.location.replace('/dashboard')
    } else {
        alert(res.statusText)
    }
}

document.querySelector('#new-post-form').addEventListener('submit', newFormHandler)