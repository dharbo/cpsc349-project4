const pb = new PocketBase('http://127.0.0.1:8090')

const signOutBtn = document.getElementById('signOut')

signOutBtn.addEventListener('click', (event) => {
  pb.authStore.clear()
  window.location.href = 'index.html'
})

const userName = pb.authStore.model.username

const body = document.querySelector('body')
const main = document.querySelector('main')

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
    message.innerHTML = 'Your tweet has been posted. Click <a href="app.html" class="underline text-blue-500">View Tweets</a> to view it in the megathread.<br>Or refresh to page to see it here!'
    message.setAttribute('class', 'text-center')

    body.insertBefore(message, main)

    setTimeout(() => {
      message.remove()
    }, 15000)
  }
})

const tweets = await pb.collection('tweets').getFullList(200, {
  filter: `user_id="${userName}"`
})

for (const tweet in tweets.reverse()) {
  const div1 = document.createElement('div')
  div1.setAttribute('class', 'container px-5 py-24 mx-auto my-5 border-4 border-black rounded-xl')

  const div2 = document.createElement('div')
  div2.setAttribute('class', '-my-8 divide-y-2 divide-gray-100')

  const div3 = document.createElement('div')
  div3.setAttribute('class', 'py-4 flex flex-wrap md:flex-nowrap')

  const div4 = document.createElement('div')
  div4.setAttribute('class', 'md:w-64 md:mb-0 mb-5 flex-shrink-0 flex flex-col')

  const span1 = document.createElement('span')
  span1.setAttribute('class', 'font-semibold title-font text-gray-700')
  span1.textContent = tweets[tweet].user_id

  const span2 = document.createElement('span')
  span2.setAttribute('class', 'mt-1 text-gray-500 text-sm')
  span2.textContent = tweets[tweet].created.slice(0, 19)

  const div5 = document.createElement('div')
  div5.setAttribute('class', 'md:flex-grow')

  const h1 = document.createElement('h1')
  h1.setAttribute('class', 'text-2xl font-medium text-gray-900 title-font mb-2')
  h1.textContent = tweets[tweet].title

  const desc = document.createElement('p')
  desc.setAttribute('class', 'leading-relaxed')
  desc.textContent = tweets[tweet].description

  const button = document.createElement('button')
  button.setAttribute('class', 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-15 h-10 rounded focus:outline-none focus:shadow-outline')
  button.textContent = 'Delete'

  div5.appendChild(h1)
  div5.appendChild(desc)

  div4.appendChild(span1)
  div4.appendChild(span2)

  div3.appendChild(div4)
  div3.appendChild(div5)
  div3.appendChild(button)

  div2.appendChild(div3)
  div1.appendChild(div2)

  main.appendChild(div1)

  button.addEventListener('click', (event) => {
    const tweetId = tweets[tweet].id
    pb.collection('tweets').delete(tweetId)

    const message = document.createElement('p')
    message.innerHTML = 'Your tweet has been deleted. It has been removed from the <a href="app.html" class="underline text-blue-500">megathread</a>.<br>You can view your updated list of tweets here by refreshing the page.'
    message.setAttribute('class', 'text-center')

    div1.after(message)

    setTimeout(() => {
      message.remove()
    }, 15000)
  })
}
