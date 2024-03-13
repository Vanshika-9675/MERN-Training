function Display({user}){
     return (
        <>
          <div className="details">
            <h2>USER DETAILS</h2>
            <p><span>Name:</span> {user.id}</p>
            <p><span>ID:</span> {user.Name}</p>
            <p><span>Email:</span> {user.email}</p>
            <p><span>Age:</span> {user.age}</p>
          </div>
        </>
     )
}
export default Display;