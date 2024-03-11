const container = document.querySelector(".container");

// Function to fetch and display books
const getBooks = async () => {
    const booksDiv = document.querySelector('.books');

    try {
        const response = await fetch('http://localhost:8000/api/v1/books', {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data!!');
        }

        const responseData = await response.json();

        if (!responseData.success || !Array.isArray(responseData.data)) {
            throw new Error('Data received from the server is not in the expected format');
        }

        const data = responseData.data;

        if (data.length === 0) {
            booksDiv.innerHTML = "<h5>No Books Available</h5>";
        } else {
            let booksHTML = `
                <h1>Library Books</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Availability</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            data.forEach(book => {
                booksHTML += `
                    <tr>
                        <td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.isBorrowed ? "Borrowed" : "Available"}</td>
                        <td>
                            <button onclick="Borrow(${book.id})" class="btn" ${book.isBorrowed ? 'disabled' : ''}>Borrow</button>
                            <button onclick="Return(${book.id})" class="btn" ${!book.isBorrowed ? 'disabled' : ''}>Return</button>
                            <button onclick="Update(${book.id})" class="btn">Update</button>
                            <button onclick="Delete(${book.id})" class="btn">Delete</button>
                        </td>
                    </tr>
                `;
            });

            booksHTML += `
                    </tbody>
                </table>
            `;

            booksDiv.innerHTML = booksHTML;
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
};

getBooks();


const addBookForm = document.getElementById('addBookForm');

addBookForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('id').value;
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    
    try {   

        const response = await fetch(`http://localhost:8000/api/v1/books`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, title, author })
        });
        
        if (!response.ok) {
            throw new Error('Failed to add book');
        }
        
        alert("Book Successfully Added!!")
        await getBooks();
    } catch (error) {
        console.error(error);
        alert("Some error Occurred!!")
    }
});


//function to update a book 
const Update = async(id)=>{
        title = window.prompt("Enter new title");
        author = window.prompt("Enter new Author");
        try {
        await fetch(`http://localhost:8000/api/v1/books/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, title, author })
        });
        alert("Book updated successfully!!");
        getBooks();
        } 
        catch (error) {
        alert("Some error Occurred");
        console.error(error);
        }
}

//function to borrow a book    
const Borrow = async (id)=>{
    try {
        const response = await fetch(`http://localhost:8000/api/v1/borrow/${id}`, {
                method: 'GET',
            });
            
            if (!response.ok) {
                throw new Error('Failed to Borrow book');
            }
            
            alert("Book Borrowed successfully!")
            getBooks();
        } catch (error) {
            alert("Error Occured!!")
            console.error(error);
        }
}

//function to update a book 
const Return = async (id)=>{
    try {
           const response =  await fetch(`http://localhost:8000/api/v1/return/${id}`, {
                method: 'GET',
            });
            if (!response.ok) {
                throw new Error('Failed to return book');
            }
            alert("Book returned successfully");
            getBooks();
        } 
        catch (error) {
            alert("Error occured")
            console.error(error);
        }
}


//function to delete a book
const Delete = async (id)=>{
    try {
          const response =   await fetch(`http://localhost:8000/api/v1/books/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete book');
            }
            alert("Book Deleted successfully")
            getBooks();
        } catch (error) {
            alert("Error occured!!")
            console.error(error);
        }
}
