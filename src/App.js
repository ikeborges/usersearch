import './App.css';
import Fuse from 'fuse.js';
import { useState, useEffect } from 'react';

const USERS = [
  {
    id: 1,
    firstName: "Santi",
    lastName: "Garza",
    avatarUrl: "https://static1.squarespace.com/static/5e430bc5df2077105c28be45/t/61e32a0590569c7d80e24519/1642277381895/SantiEdit.jpg"
  },
  {
    id: 2,
    firstName: "Lucas",
    lastName: "Garza",
    avatarUrl: "https://static1.squarespace.com/static/5e430bc5df2077105c28be45/t/61e32afdd60ca23f6487213c/1642277629694/TunaEdit.jpg"
  },
  {
    id: 3,
    firstName: "Lil",
    lastName: "Steve",
    avatarUrl: "https://static1.squarespace.com/static/5e430bc5df2077105c28be45/t/61e32b76946c69045ca92b36/1642277750968/Lil%27Steve.jpg"
  },
  {
    id: 4,
    firstName: "Drew",
    lastName: "Glicker",
    avatarUrl: "https://static1.squarespace.com/static/5e430bc5df2077105c28be45/t/60f9db386c061c478d3a6204/1626987320809/Drew.jpg"
  },
  {
    id: 5,
    firstName: "Gavin",
    lastName: "Thatcher",
    avatarUrl: "https://static1.squarespace.com/static/5e430bc5df2077105c28be45/t/611afe75be997f53364c29c4/1629159030025/Gavin.jpg"
  },
  {
    id: 6,
    firstName: "Ryan",
    lastName: "Dube",
    avatarUrl: "https://static1.squarespace.com/static/5e430bc5df2077105c28be45/t/60d3d39925af697594a34b62/1624495004009/Ryan_Edit.jpg"
  }
]

function App() {

  const [searchText, setSearchText] = useState("")
  const [searchResults, setSearchResults] = useState([])

  const fuse = new Fuse(USERS, {
    keys: ['firstName', 'lastName']
  })

  useEffect(() => {
    setSearchResults(USERS.map(user => ({item: user})))
  }, [])

  const changeHandler = (e) => {
    const text = e.target.value
    setSearchText(text)

    if (text.length === 0) {
      setSearchResults(USERS.map(user => ({item: user})))
      return
    }

    setSearchResults(fuse.search(text))
  }

  return (
    <div className="container">
      <div className='searchContainer'>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        <input value={searchText} onChange={changeHandler} type="text" />
      </div>
      <div>
        <ul>
          {
            searchResults.length > 0 ?
              searchResults.map(userItem => {
                const user = userItem.item

                return (
                  <li key={user.id}>
                    <a href='#'>
                      <img src={user.avatarUrl} alt={`${user.firstName} ${user.lastName}'s avatar`} />
                      <p>{user.firstName} {user.lastName}</p>
                    </a>
                  </li>
                )
              })
              :
              "No users match your query"
          }
        </ul>
      </div>
    </div>
  );
}

export default App;
