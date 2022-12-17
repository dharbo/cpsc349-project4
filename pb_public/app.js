const pb = new PocketBase('http://127.0.0.1:8090')

const signOutBtn = document.getElementById('signOut')

signOutBtn.addEventListener('click', (event) => {
  pb.authStore.clear()
  window.location.href = 'index.html'
})

const main = document.querySelector('main')

const tweets = await pb.collection('tweets').getFullList()

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

  div5.appendChild(h1)
  div5.appendChild(desc)

  div4.appendChild(span1)
  div4.appendChild(span2)

  div3.appendChild(div4)
  div3.appendChild(div5)

  div2.appendChild(div3)
  div1.appendChild(div2)

  main.appendChild(div1)
}
