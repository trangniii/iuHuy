const hallService = require('../services/hallService');
const showtimeService = require('../services/showtimesService');
const showtimesRouter = require("express").Router();

// Lấy danh sách suất chiếu
showtimesRouter.get('/:id', async (req, res) => {
    try {
        const showtimes = await showtimeService.getShowtimesById(req.params.id);
        const movieTitle = showtimes.length > 0 ? showtimes[0].Movie.title : null;
        const halls = await hallService.getAllHall()
        res.render('pages/showtimes', { showtimes, movieTitle, halls });
    } catch (error) {
        console.error("Lỗi khi lấy danh sách suất chiếu:", error);
        res.status(500).send("Lỗi server");
    }
});

// Thêm suất chiếu mới
showtimesRouter.post('/add', async (req, res) => {
    try {
        await showtimeService.addShowtime(req.body);
        res.redirect('/showtimes');
    } catch (error) {
        console.error("Lỗi khi thêm suất chiếu:", error);
        res.status(500).send("Lỗi server");
    }
});

// Xóa suất chiếu
showtimesRouter.post('/delete/:id', async (req, res) => {
    try {
        await showtimeService.deleteShowtime(req.params.id);
        res.redirect('/showtimes');
    } catch (error) {
        console.error("Lỗi khi xóa suất chiếu:", error);
        res.status(500).send("Lỗi server");
    }
});

// Cập nhật suất chiếu
showtimesRouter.post('/update/:id', async (req, res) => {
    try {
        await showtimeService.updateShowtime(req.params.id, req.body);
        res.redirect('/showtimes');
    } catch (error) {
        console.error("Lỗi khi cập nhật suất chiếu:", error);
        res.status(500).send("Lỗi server");
    }
});

module.exports = showtimesRouter;
