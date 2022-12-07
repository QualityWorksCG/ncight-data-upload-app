

import useUser from '../lib/useUser'

function Dashboard () {
  const { user, loading, loggedOut, signOut } = useUser({ redirect: '/' })

  if (loading) return <>Loading...</>
  if (loggedOut) return <>Redirect...</>

  //console.log(user.signInUserSession?.idToken?.jwtToken)

  return (
    <>
      <main >
        <h1 >Welcome, {user.attributes?.email}!</h1>
        <p>
          Sign out and redirect to home: <button onClick={() => signOut({ redirect: '/' })}>SignOut</button>
        </p>
      </main>
    </>
  )
}

export default Dashboard