const commentFormHandler = async (event) => {
    event.preventDefault()

    const comment_text = document.querySelector('#comment').value.trim()
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ]
    // console.log(comment_text, post_id)

    if (comment_text) {
        const res = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                comment_text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (res.ok) {
            document.location.reload()
        } else {
            alert(response.statusText)
        }
    }
}

document.querySelector('#comment-form').addEventListener('submit', commentFormHandler)