const email = document.getElementById('email')
const password = document.getElementById('password')
const form = document.getElementById('login')

form.addEventListener('submit', async (event) => {
  event.preventDefault()

  const pb = new PocketBase('http://127.0.0.1:8090')

  const userEmail = email.value
  const userPassword = password.value

  const authData = await pb.collection('users').authWithPassword(userEmail, userPassword)

  if (authData) {
    window.location.href = 'app.html'
  }
})
