import './App.css'
import Display from './Display';
import { useState } from 'react';

const UserDetail =[
   {
     id:1,
     Name:"vanshika",
     email:"van@123",
     age:22
   },
   {
     id:2,
     Name:"Chaya",
     email:"Chaya@123",
     age:21
   },
   {
     id:3,
     Name:"Manas",
     email:"Manas@123",
     age:22
   },
   {
     id:4,
     Name:"Sagar",
     email:"Sagar@123",
     age:22
   }
]


function App() {

    const [userId, setUserId] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    

    const fetchUserID =(e)=>{
      //setting user Id if input changes
      setUserId(()=>{
          return e.target.value;
      })
    }

    //searching user if exist
    const handleSearch = (e) => {
      e.preventDefault();
      const foundUser = UserDetail.find(user => user.id == userId);
      console.log(foundUser);
      if (!foundUser) {
        alert('User not found');
        return;
      }
      setCurrentUser(foundUser);
    }

  return (
    <div className='parent'>
      <div className='card'>
        <form action="">
          <input type="text" id="input-field" placeholder='Enter id...' onChange={fetchUserID} />
          <button className='search-btn ' onClick={handleSearch}>
          Search
         </button>
         {currentUser && <Display user={currentUser}/>}
        </form>
      </div>
    </div>
  )
}

export default App;
