const hallService = require('../services/hallService');
const showtimeService = require('../services/showtimesService');
const showtimesRouter = require("express").Router();

// Lấy danh sách suất chiếu
showtimesRouter.get('/showtimes/:id', async (req, res, next) => {
    try {
        const showtimes = await showtimeService.getShowtimesById(req.params.id);
        const movieId = showtimes.length > 0 ? showtimes[0].movieId : null;
        const movieTitle = showtimes.length > 0 ? showtimes[0].Movie.title : null;
        const halls = await hallService.getAllHall()
        res.render('admin/showtimes', { showtimes, movieTitle, movieId, halls });
    } catch (error) {
        next(error);
    }
});

// Thêm suất chiếu mới
showtimesRouter.post('/showtimes/add/:movieId', async (req, res, next) => {
    try {
        const data = {
            movieId: req.params.movieId,
            ...req.body
        }
        await showtimeService.addShowtime(data);
        res.redirect("back");
    } catch (error) {
        next(error);
    }
});

// Xóa suất chiếu
showtimesRouter.post('/showtimes/delete/:id', async (req, res, next) => {
    try {
        await showtimeService.deleteShowtime(req.params.id);
        res.redirect('back');
    } catch (error) {
        next(error);
    }
});

// Cập nhật suất chiếu
showtimesRouter.post('/showtimes/update/:id', async (req, res, next) => {
    try {
        await showtimeService.updateShowtime(req.params.id, req.body);
        res.redirect('back');
    } catch (error) {
        next(error);
    }
});

module.exports = showtimesRouter;
