const { User, Ruang, Booking } = require('../models');
const { checkPass } = require('../helpers/encryptor');
const { signToken } = require('../helpers/jwt');
class Controller {

    static async register(req, res, next) {
        try {
            const { name, password, id_kampus, role } = req.body;

            const user = await User.create({ name, password, id_kampus, role });

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

        } catch (err) {
            next(err);
        }
    }

    static async book(req, res, next) {
        try {

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
                attributes: ['nama_ruang', 'kapasitas'],
            })

            res.status(200).json({ ruang });
        } catch (err) {
            next(err);
        }
    }

}

module.exports = Controller;