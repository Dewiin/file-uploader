const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const prisma = require("./prismaClient");

async function verifyCallback(username, password, done) {
	try {
		const user = await prisma.user.findUnique({
			where: {
				username,
			},
		});
		if (!user) {
			return done(null, false, { message: "Username not found." });
		}

		const match = await bcrypt.compare(password, user.password);
		if (!match) {
			return done(null, false, { message: "Incorrect username or password" });
		}

		return done(null, user);
	} catch (err) {
		return done(err);
	}
}

passport.use(new LocalStrategy(verifyCallback));

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await prisma.user.findUnique({ where: { id } });

		done(null, user);
	} catch (err) {
		done(err);
	}
});
