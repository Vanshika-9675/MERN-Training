const library = require('../models/schema');
const mongoose = require('mongoose');
//borrowing
exports.borrow =  async (req, res) => {
    try {
        const bookid = req.params.id;

        const book = await library.findOne({ id: bookid });

        if (book && !book.isBorrowed){
            book.isBorrowed = true;
            await book.save();
            res.json({
                 success:"true",
                 message: 'Book borrowed successfully!!' 
                });
        }
        else{
            res.status(400).json({ 
                success:false,
                message: 'Book is not available!' 
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            success:false,
            data:"Internal server errror",
            message:error.message
         });
    }
}


//returning 
exports.returning = async (req, res) => {
    try {
        const bookid = req.params.id;
        const book = await library.findOne({ id: bookid });

        if (book && book.isBorrowed) {
            book.isBorrowed = false;
            await book.save();
            res.status(200).json({ 
                success:true,
                message: 'Book returned successfully'
             });

        } else if(!book.isBorrowed) {
            res.status(400).json({ 
                success:false,
                message: 'Book not borrowed!!'
             });
        }
        else{
            res.status(404).json({ 
                success:false,
                message: 'Book not found!!'
             });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            success:false,
            data:"Internal server errror",
            message:error.message
         });
    }
}