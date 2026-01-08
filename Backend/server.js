const express = require("express");
const cors = require("cors");
const doctorsRouter = require("./routes/doctors");
const patientsRouter = require("./routes/patients");
const authRouter = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/doctors", doctorsRouter);
app.use("/api/patients", patientsRouter);
app.use("/api/auth", authRouter);

// Debug: list registered routes
app.get('/routes', (req, res) => {
	const routes = [];
	app._router.stack.forEach(mw => {
		if (mw.route) {
			const methods = Object.keys(mw.route.methods).join(',').toUpperCase();
			routes.push({ path: mw.route.path, methods });
		} else if (mw.name === 'router' && mw.handle && mw.handle.stack) {
			mw.handle.stack.forEach(r => {
				if (r.route) {
					const methods = Object.keys(r.route.methods).join(',').toUpperCase();
					routes.push({ path: (mw.regexp && mw.regexp.source) || mw.regexp, methods, route: r.route.path });
				}
			});
		}
	});
	res.json(routes);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
	try {
		const routes = [];
		(app._router && app._router.stack || []).forEach(mw => {
			if (mw.route) {
				routes.push({ path: mw.route.path, methods: Object.keys(mw.route.methods).join(',') });
			} else if (mw.name === 'router' && mw.handle && mw.handle.stack && Array.isArray(mw.handle.stack)) {
				mw.handle.stack.forEach(r => {
					if (r && r.route) routes.push({ path: r.route.path, methods: Object.keys(r.route.methods).join(',') });
				});
			}
		});
		console.log('Registered routes:', JSON.stringify(routes, null, 2));
	} catch (e) {
		console.error('Error listing routes:', e);
	}
});
