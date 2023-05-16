function Header({ setShowForm, showForm }) {
	return (
		<header className="header">
			<div className="logo">
				<img src="logo.png" alt="Today I Learned Logo" height="68" />
				<h1>Today I Learned</h1>
			</div>
			<button
				className="btn btn-large btn-open"
				onClick={() => setShowForm((st) => !st)}
			>
				{showForm ? "Close" : "Share a Fact"}
			</button>
		</header>
	);
}

export default Header;
