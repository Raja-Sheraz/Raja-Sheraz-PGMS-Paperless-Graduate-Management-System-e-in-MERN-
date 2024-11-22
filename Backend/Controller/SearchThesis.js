const Thesis = require('../Models/UploadThesis');

const SearchThesis = async (req, res) => {
    const searchTerm = req.query.term;

    try {
        // Search for PDFs matching the search term
        const searchResults = await Thesis.find({
            $or: [
                { title: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search
                { description: { $regex: searchTerm, $options: 'i' } },
                { author: { $regex: searchTerm, $options: 'i' } }
            ]
        }).select('title description author pdfPath'); // Projection to include specific fields

        res.json(searchResults);
    } catch (error) {
        console.error('Error searching for PDFs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    SearchThesis,
}
