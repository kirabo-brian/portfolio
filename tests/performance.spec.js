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
