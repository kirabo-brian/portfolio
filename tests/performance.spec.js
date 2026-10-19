import { expect, test } from "@playwright/test";

test("home defers gallery code until navigation", async ({ page }) => {
  const scripts = [];
  page.on("request", (request) => {
    if (request.resourceType() === "script") scripts.push(request.url());
  });
  await page.goto("/");
  await expect(page.getByRole("link", { name: "View My Work" })).toBeVisible();
  expect(scripts.some((url) => /\/Gallery-/.test(url))).toBe(false);
  await page.getByRole("link", { name: "View My Work" }).click();
  await expect(page.getByRole("heading", { name: "Collections", exact: true })).toBeVisible();
  expect(scripts.some((url) => /\/Gallery-/.test(url))).toBe(true);
});

for (const width of [320, 390, 1024]) {
  test(`pages fit a ${width}px viewport`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    for (const route of ["/", "/gallery", "/contact"]) {
      await page.goto(route);
      await expect(page.locator("footer")).toBeAttached();
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      expect(overflow, `${route} overflows at ${width}px`).toBe(false);
    }
    expect(errors).toEqual([]);
  });
}

test("mobile gallery uses previews and does not request decorative video", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const videos = [];
  page.on("request", (request) => {
    if (/\.(mp4|webm)(\?|$)/.test(request.url())) videos.push(request.url());
  });
  await page.goto("/gallery?collection=animation");
  await expect(page.getByRole("button", { name: "Close collection" })).toBeVisible();
  const cards = page.locator("img[srcset]");
  await expect(cards.first()).toHaveAttribute("src", /\.webp$/);
  const video = page.locator("video").last();
  await video.scrollIntoViewIfNeeded();
  await expect(video).not.toHaveAttribute("src");
  expect(videos).toEqual([]);
});

test("reduced motion keeps the desktop background static", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("link", { name: "View My Work" })).toBeVisible();
  await expect(page.locator("video").first()).not.toHaveAttribute("src");
});

test("featured arrow keys update numeric URL selection", async ({ page }) => {
  await page.goto("/gallery?featured=0");
  await expect(page.getByRole("button", { name: "Close featured project" })).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(page).toHaveURL(/featured=1/);
  await page.keyboard.press("ArrowLeft");
  await expect(page).toHaveURL(/featured=0/);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Close featured project" })).toHaveCount(0);
});

test("full artwork stays available and the lightbox exits before removal", async ({ page }) => {
  await page.goto("/gallery?collection=posters&item=0");
  const close = page.getByRole("button", { name: "Close media" });
  await expect(close).toBeVisible();
  // Thumbnails use WebP; opened artwork keeps its original PNG/JPEG.
  expect(await page.locator("img:not([srcset])").last().getAttribute("src")).toMatch(/\.(png|jpg|jpeg)$/);
  const retainedDuringExit = await close.evaluate(async (button) => {
    button.click();
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    return button.isConnected;
  });
  expect(retainedDuringExit).toBe(true);
  await expect(close).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Close collection" })).toBeVisible();
});

test("landscape touch phones never fetch decorative video", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 844, height: 390 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  const videos = [];
  page.on("request", request => { if (/\.(mp4|webm)(\?|$)/.test(request.url())) videos.push(request.url()); });
  await page.goto("http://127.0.0.1:4173/gallery");
  await page.getByRole("button", { name: /Coding Projects/ }).scrollIntoViewIfNeeded();
  await expect(page.locator("video[src]")).toHaveCount(0);
  expect(videos).toEqual([]);
  await context.close();
});

test("desktop uses compressed previews, never original decorative video", async ({ page }) => {
  const originals = [];
  page.on("request", request => { if (/background_2|cover-video/.test(request.url())) originals.push(request.url()); });
  await page.goto("/gallery");
  await expect(page.locator("video").first()).toHaveAttribute("src", /[a-f0-9]{16}.*\.mp4$/);
  await page.getByRole("button", { name: /Coding Projects/ }).scrollIntoViewIfNeeded();
  await expect(page.locator("video").last()).toHaveAttribute("src", /[a-f0-9]{16}.*\.mp4$/);
  expect(originals).toEqual([]);
});

test("gallery defers viewers and dialogs trap and restore keyboard focus", async ({ page }) => {
  const scripts = [];
  page.on("request", request => { if (request.resourceType() === "script") scripts.push(request.url()); });
  await page.goto("/gallery");
  const trigger = page.getByRole("button", { name: /Posters/ });
  await expect(trigger).toBeVisible();
  expect(scripts.some(url => /CollectionModal-/.test(url))).toBe(false);
  await trigger.focus();
  await page.keyboard.press("Enter");
  const collection = page.getByRole("dialog", { name: "Posters", exact: true });
  await expect(collection).toBeVisible();
  expect(scripts.some(url => /CollectionModal-/.test(url))).toBe(true);
  await expect(page.locator("#root")).toHaveAttribute("inert", "");
  await expect(collection.getByRole("button", { name: "Close collection" })).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  expect(await collection.evaluate(node => node.contains(document.activeElement))).toBe(true);
  const artwork = collection.getByRole("button", { name: /^Open / }).first();
  await artwork.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog", { name: "Artwork viewer" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Artwork viewer" })).toHaveCount(0);
  await expect(artwork).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(collection).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await expect(page.locator("#root")).not.toHaveAttribute("inert");
});

test("page metadata and robots are available without JavaScript", async ({ request, page }) => {
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain("User-agent: *");
  expect(await robots.text()).not.toContain("<!doctype");
  const gallery = await request.get("/gallery");
  expect(await gallery.text()).toContain("Creative Work &amp; Projects | Kirabo Brian Ssentaba");
  const contact = await request.get("/contact");
  expect(await contact.text()).toContain("Contact Kirabo Brian Ssentaba | Design &amp; Development");
  await page.goto("/");
  await page.getByRole("link", { name: "View My Work" }).click();
  await expect(page).toHaveTitle("Creative Work & Projects | Kirabo Brian Ssentaba");
});

test("data saving prevents desktop decorative video downloads", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "connection", { configurable: true, value: { saveData: true, addEventListener() {}, removeEventListener() {} } });
  });
  const videos = [];
  page.on("request", request => { if (/\.(mp4|webm)(\?|$)/.test(request.url())) videos.push(request.url()); });
  await page.goto("/gallery");
  await page.getByRole("button", { name: /Coding Projects/ }).scrollIntoViewIfNeeded();
  await expect(page.locator("video[src]")).toHaveCount(0);
  expect(videos).toEqual([]);
});

test("coding screenshot closes one dialog layer at a time", async ({ page }) => {
  await page.goto("/gallery?collection=coding-projects&project=fleet-maintenance&screenshot=0");
  const screenshot = page.getByRole("dialog", { name: "Project screenshot", exact: true });
  await expect(screenshot).toBeVisible();
  await expect(screenshot.getByRole("button", { name: "Close screenshot" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(screenshot).toHaveCount(0);
  const project = page.getByRole("dialog", { name: "Fleet Maintenance & Service Bay System", exact: true });
  await expect(project).toBeVisible();
  await expect(project.getByRole("button", { name: "Close project", exact: true })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(project).toHaveCount(0);
  const collection = page.getByRole("dialog", { name: "Coding Projects", exact: true });
  await expect(collection).toBeVisible();
  await expect(collection.getByRole("button", { name: "Close collection" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(collection).toHaveCount(0);
  await expect(page.locator("#root")).not.toHaveAttribute("inert");
});
