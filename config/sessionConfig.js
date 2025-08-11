const expressSession = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const prisma = require("./prismaClient");

const sessionConfig = expressSession({
	cookie: {
		maxAge: 7 * 24 * 60 * 60 * 1000, // ms
	},
	secret: process.env.SESSION_SECRET,
	resave: true,
	saveUninitialized: true,
	store: new PrismaSessionStore(prisma, {
		checkPeriod: 2 * 60 * 1000, //ms
		dbRecordIdIsSessionId: true,
		dbRecordIdFunction: undefined,
	}),
});

module.exports = sessionConfig;
