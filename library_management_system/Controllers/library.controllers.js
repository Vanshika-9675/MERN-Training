const library = require('../models/schema');

//add books
exports.addBook = async (req,res)=>{
    try{
        const {id,title,author,isBorrowed} = req.body;
        const book  = await library.findOne({id});
        if(book){
           return res.status(409).json({
                success:false,
                data:"Book with given id already exist!!",
            })
        }
        const response = await library.create({id,title,author,isBorrowed});
        res.status(200).json({
           success:true,
           data:response,
           message:"Book added successfully!!"
        })

    }catch(err){
           console.log(err);
           res.status(500).json({
            success:false,
            data:"Internal server error!",
            message:err.message
           })
    }
}

//show all books
exports.showAllBooks = async (req,res)=>{
    try {
        //fetch all books from database
        const books  = await library.find();

        res.status(200).json({
            success:true,
            data:books,
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            data:"Internal server error!!",
            message:error.message
        })
    }
}

//get single book by id 
exports.showBook = async (req,res)=>{
    try {
        const bookid = req.params.id;
       // console.log(bookid);
        const book  = await library.findOne({id:bookid});
        if(!book){
            res.status(404).json({
                success:false,
                data:"Book with given id is not present!!",
            })
            return;
        }
        res.status(200).json({
            success:true,
            data:book,
        })
    }catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            data:"Internal server error!!",
            message:error.message
        })
    }
}


//update the book 
exports.updateBook = async (req,res)=>{
    try {
        const bookid = req.params.id;
       
        const book  = await library.findOne({id:bookid});

        if(!book){
            res.status(404).json({
                success:false,
                data:"Book with given id is not present!!",
            })
            return;
        }

        const {title,author,isBorrowed} = req.body;
        await library.updateOne({ id: bookid , title, author, isBorrowed });

        res.status(200).json({
           success:true,
           message:"Book updated successfully!!"
        })


    }catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            data:"Internal server error!!",
            message:error.message
        })
    }
}


//delete a book 
exports.deleteBook = async (req,res)=>{
    try {
        const bookid = req.params.id;
       
        const book  = await library.findOne({id:bookid});
        if(!book){
            res.status(404).json({
                success:false,
                data:"Book with given id is not present!!",
            })
            return;
        }
        await library.deleteOne({id:bookid});
        res.status(200).json({
           success:true,
           message:"Book deleted successfully!!"
        })


    }catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            data:"Internal server error!!",
            message:error.message
        })
    }
}
