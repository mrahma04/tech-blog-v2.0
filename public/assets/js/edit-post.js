const updatePostHandler = async (event) => {
    event.preventDefault()
    const title = document.querySelector('#post-title').value.trim()
    const post_content = document.querySelector('#post-content').value.trim()

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ]

    console.log(title, post_content, id)

    const res = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            post_content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (res.ok) {
        document.location.replace('/dashboard')
    } else {
        alert(res.statusText)
    }
}

const deletePostHandler = async (event) => {
    event.preventDefault()
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ]
    const res = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        document.location.replace('/dashboard')
    } else {
        alert(res.statusText)
    }
}

document.querySelector('#update-post').addEventListener('click', updatePostHandler)
document.querySelector('#delete-post').addEventListener('click', deletePostHandler)