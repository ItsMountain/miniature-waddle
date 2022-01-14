module.exports = {
    landingPage = (req, res) => {
        const message = 'Hello json';
        res.status(200).json({ message });
    }
}