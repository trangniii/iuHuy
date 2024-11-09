const showtimesRouter = express.Router();
const showtimeService = require('../services/showtimesService');

// Lấy danh sách suất chiếu
showtimesRouter.get('/', async (req, res) => {
    try {
        const showtimes = await showtimeService.getShowtimes();
        res.render('pages/showtimes', { showtimes });
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

showtimesRouter.exports = router;
