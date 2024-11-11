const hallService = require('../services/hallService');
const movieService = require('../services/movieService');
const showtimeService = require('../services/showtimesService');
const showtimesRouter = require("express").Router();

// Lấy danh sách suất chiếu
showtimesRouter.get('/showtimes/:movieid', async (req, res, next) => {
    try {
        const showtimes = await showtimeService.getShowtimesById(req.params.movieid);
        const halls = await hallService.getAllHall();
        const movie = await movieService.getDetailOfMovie(req.params.movieid);
        res.render('admin/showtimes', { showtimes, movie, halls });
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
