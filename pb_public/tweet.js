const pb = new PocketBase('http://127.0.0.1:8090')
const body = document.querySelector('body')

const title = document.getElementById('title')
const description = document.getElementById('description')
const form = document.getElementById('tweet')

form.addEventListener('submit', async (event) => {
  event.preventDefault()

  const tweetTitle = title.value
  const tweetDescription = description.value

  const record = await pb.collection('tweets').create({
    title: tweetTitle,
    description: tweetDescription,
    user_id: pb.authStore.model.username
  })

  if (record) {
    const message = document.createElement('p')
    message.innerHTML = 'Your tweet has been posted. Click <a href="app.html" class="underline text-blue-500">View Tweets</a> to view it in the megathread.'
    message.setAttribute('class', 'text-center')

    body.appendChild(message)

    setTimeout(() => {
      message.remove()
    }, 15000)
  }
})
