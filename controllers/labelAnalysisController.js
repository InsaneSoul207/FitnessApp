exports.analyze = (req, res) => {
    const { image } = req.body;

    // Fake analysis logic
    let result = {
        message: "This product is 80% aligned with your fat loss goal."
    };

    // Send back the result of analysis
    res.json(result);
};
