import formatSocialURL from ".";

describe("construct social url helper", () => {
	it("takes in email as a field and returns interpolated string", () => {
		expect(formatSocialURL(formatSocialURL.types.Email, "username")).toBe("mailto:username");
	});
	it("takes in facebook as a field and returns interpolated string", () => {
		expect(formatSocialURL(formatSocialURL.types.Facebook, "username")).toBe(
			"https://www.facebook.com/username"
		);
	});
	it("takes in instagram as a field and returns interpolated string", () => {
		expect(formatSocialURL(formatSocialURL.types.Instagram, "username")).toBe(
			"https://www.instagram.com/username/"
		);
	});
	it("takes in linkedin as a field and returns interpolated string", () => {
		expect(formatSocialURL(formatSocialURL.types.LinkedIn, "username")).toBe(
			"https://www.linkedin.com/in/username/"
		);
	});
	it("takes in medium as a field and returns interpolated string", () => {
		expect(formatSocialURL(formatSocialURL.types.Medium, "@username")).toBe(
			"https://medium.com/@username"
		);
	});
	it("takes in pinterest as a field and returns interpolated string", () => {
		expect(formatSocialURL(formatSocialURL.types.Pinterest, "username")).toBe(
			"https://www.pinterest.com/username/"
		);
	});
	it("takes in reddit as a field and returns interpolated string", () => {
		expect(formatSocialURL(formatSocialURL.types.Reddit, "username")).toBe(
			"https://www.reddit.com/user/username/"
		);
	});
	it("takes in snapchat as a field and returns interpolated string", () => {
		expect(formatSocialURL(formatSocialURL.types.Snapchat, "username")).toBe(
			"https://www.snapchat.com/add/username"
		);
	});
	it("takes in soundcloud as a field and returns interpolated string", () => {
		expect(formatSocialURL(formatSocialURL.types.SoundCloud, "username")).toBe(
			"https://soundcloud.com/username"
		);
	});
	it("takes in twitter as a field and returns interpolated string", () => {
		expect(formatSocialURL(formatSocialURL.types.Twitter, "username")).toBe(
			"https://twitter.com/username"
		);
	});
	it("takes in tumblr as a field and returns interpolated string", () => {
		expect(formatSocialURL(formatSocialURL.types.Tumblr, "username")).toBe(
			"https://username.tumblr.com"
		);
	});
	it("takes in youtube as a field and returns interpolated string", () => {
		expect(formatSocialURL(formatSocialURL.types.Youtube, "username")).toBe(
			"https://www.youtube.com/user/username"
		);
	});
	it("takes in whatsapp as a field and returns interpolated string", () => {
		expect(formatSocialURL(formatSocialURL.types.WhatsApp, "phonenum")).toBe(
			"https://wa.me/phonenum"
		);
	});
	it("returns the field value if unknown", () => {
		expect(formatSocialURL("unknown value", "username")).toBe("username");
	});
	it("returns the field value if it is prefixed with protocol", () => {
		expect(formatSocialURL("facebook", "http://fb.me/user")).toBe("http://fb.me/user");
	});
});
