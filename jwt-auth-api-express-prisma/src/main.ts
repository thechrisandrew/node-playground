require("dotenv").config();

import server from "./server";

const PORT = process.env.PORT || 5000;

const startServer = () => {
	server.listen(PORT, () => {
		console.log(`🚀 Server running at: http://localhost:${PORT}`);
	});
};

startServer();
