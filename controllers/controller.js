const { User, Ruang, Booking } = require('../models');
const { checkPass } = require('../helpers/encryptor');
const { signToken } = require('../helpers/jwt');
const { Op } = require("sequelize");
class Controller {

    static async register(req, res, next) {
        try {
            const { name, password, id_kampus, role } = req.body;

            const user = await User.create({ name, password, id_kampus, role });
            //! type user: admin & user
            res.status(201).json({ name: user.name, id_kampus: user.id_kampus, role: user.role });

        } catch (err) {
            next(err);
        }
    }

    static async login(req, res, next) {
        try {
            const { id_kampus, password } = req.body;

            if (!id_kampus || !password) {
                throw { name: "validation_error", message: "id and password are required", code: 400 }
            }

            const user = await User.findOne({ where: { id_kampus } });
            if (!user) {
                throw { name: "not_found", message: 'Invalid id or password', code: 401 };
            }

            const isValidPass = checkPass(password, user.password);
            if (!isValidPass) {
                throw { name: "validation_error", message: "Invalid id or password", code: 401 };
            }

            const access_token = signToken({ id_kampus: user.id_kampus, role: user.role, name: user.name, id: user.id });

            res.status(200).json({ access_token, user: { id_kampus: user.id_kampus, role: user.role, name: user.name, id: user.id } });

        } catch (err) {
            next(err);
        }
    }

    static async book(req, res, next) {
        try {
            const { tgl_booking, time, alasan, id_ruang } = req.body;
            const { id } = req.user;

            //validasi

            //! type status: pending, approved, rejected
            const booking = await Booking.create({ tgl_booking, nama_booking: +id, shift_mulai: time[0], shift_selesai: time[1], keperluan: alasan, id_ruang, status: "pending" });

            res.status(201).json({ booking });

        } catch (err) {
            next(err);
        }
    }

    static async getList(req, res, next) {
        try {
            const { role, id } = req.user;
            if (role === 'admin') {
                const bookings = await Booking.findAll({
                    include: [{
                        model: Ruang
                    }, {
                        model: User,
                        attributes: ['id', 'name', 'id_kampus', 'role'],
                    }],
                    where:
                    {
                        status: "pending"
                    }
                });
                res.status(200).json({ bookings });
            }
            else {
                const bookings = await Booking.findAll({
                    include: [{
                        model: Ruang
                    }, {
                        model: User,
                        attributes: ['id', 'name', 'id_kampus', 'role'],
                    }],
                    where:
                    {
                        nama_booking: +id,
                    }
                });
                res.status(200).json({ bookings });
            }
        } catch (err) {
            next(err);
        }
    }

    static async getListAll(req, res, next) {
        try {

            const bookings = await Booking.findAll({
                include: [{
                    model: Ruang
                }, {
                    model: User,
                    attributes: ['id', 'name', 'id_kampus', 'role'],
                }],
                where:
                {
                    status: {
                        [Op.ne]: "pending",
                    }
                }
            });
            res.status(200).json({ bookings });


        } catch (err) {
            next(err);
        }
    }



    static async getBook(req, res, next) {
        try {
            const { id_ruang, tgl_booking } = req.body;
            const ruang = +id_ruang;
            const date = new Date(tgl_booking);
            console.log(date)
            const booking = await Booking.findAll({
                include: [{
                    model: Ruang
                }, {
                    model: User,
                    attributes: ['id', 'name', 'id_kampus', 'role'],
                }],
                where:
                {
                    tgl_booking: date,
                    id_ruang: ruang
                }
            })

            res.status(200).json({ booking });

        } catch (err) {
            next(err);
        }
    }

    static async updateBook(req, res, next) {
        try {
            const { id, status, alasan } = req.body;

            const booking = await Booking.update({ status, alasan }, { where: { id } });

            res.status(200).json({ booking });

        } catch (err) {
            next(err);
        }
    }

    static async getGedung(req, res, next) {
        try {
            const ruang = await Ruang.findAll({
                attributes: ['gedung'],
                group: ['gedung']
            })

            const gedung = [];

            for (let i = 0; i < ruang.length; i++) {
                gedung.push(ruang[i].gedung);
            }

            res.status(200).json({ gedung });

        } catch (err) {
            next(err);
        }
    }

    static async getRuang(req, res, next) {
        try {
            const gedung = req.params.id;

            const ruang = await Ruang.findAll({
                where: { gedung },
                attributes: ['id', 'nama_ruang', 'kapasitas'],
            })

            res.status(200).json({ ruang });
        } catch (err) {
            next(err);
        }
    }

}

module.exports = Controller;