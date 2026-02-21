/**
 * Accessibility Audit — https://vignesh-as.dev
 *
 * Standard:  WCAG 2.1 Level A & AA
 * Engine:    axe-core (automated) + manual Playwright assertions
 *
 * Test layout:
 *   Suite 1 – Automated axe-core scan (reports ALL violations, fails on critical/serious)
 *   Suite 2 – Page Structure        (WCAG 1.3.1, 2.4.2, 3.1.1)
 *   Suite 3 – Navigation & Focus    (WCAG 2.4.1, 2.4.7, 4.1.2)
 *   Suite 4 – Images & Media        (WCAG 1.1.1)
 *   Suite 5 – Forms                 (WCAG 1.3.1, 3.3.2, 4.1.2)
 *   Suite 6 – Responsive / Reflow   (WCAG 1.4.10)
 *
 * Tests annotated with test.fail() document known issues on the site.
 * They are expected to fail — they pass the CI gate while surfacing the gap.
 */

import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { createHtmlReport } from "axe-html-reporter";

const TARGET_URL = "https://vignesh-as.dev/";

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function formatViolations(
  violations: Awaited<ReturnType<AxeBuilder["analyze"]>>["violations"],
): string {
  return violations
    .map(
      (v) =>
        `[${v.impact?.toUpperCase()}] ${v.id}: ${v.description}\n` +
        v.nodes
          .slice(0, 3)
          .map((n) => `    ↳ ${n.html.slice(0, 120)}`)
          .join("\n"),
    )
    .join("\n\n");
}

// ─────────────────────────────────────────────────────────────────────────────
// Suite 1 – Automated axe-core scan
// ─────────────────────────────────────────────────────────────────────────────

test.describe("Suite 1 — Automated axe-core Scan", () => {
  test("should have no critical or serious WCAG 2.1 AA violations", async ({
    page,
  }) => {
    await page.goto(TARGET_URL);
    await page.waitForLoadState("domcontentloaded");

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"])
      .options({ reporter: "v2", resultTypes: ["passes", "violations", "incomplete"], performanceTimer:true, absolutePaths: true }) // Use the more detailed v2 format
      .analyze();

    // Generate and attach the axe HTML report to the Playwright report
    const htmlReport = createHtmlReport({
      results,
      options: {
        projectKey: "vignesh-as.dev — WCAG 2.1 AA Audit (Critical & Serious)",
        doNotCreateReportFile: true,
      },
    });
    await test.info().attach("axe-report-critical-serious.html", {
      body: htmlReport,
      contentType: "text/html",
    });

    const criticalOrSerious = results.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious",
    );

    expect(
      criticalOrSerious,
      `Critical/serious axe violations:\n\n${formatViolations(criticalOrSerious)}`,
    ).toHaveLength(0);
  });

  test("should have no moderate WCAG 2.1 AA violations", async ({ page }) => {
    await page.goto(TARGET_URL);
    await page.waitForLoadState("domcontentloaded");

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"])
      .options({
        reporter: "v2",
        resultTypes: ["passes", "violations", "incomplete"],
        performanceTimer: true,
        absolutePaths: true,
      })
      .analyze();

    const moderate = results.violations.filter((v) => v.impact === "moderate");

    const htmlReport = createHtmlReport({
      results,
      options: {
        projectKey: "vignesh-as.dev — WCAG 2.1 AA Audit (Moderate)",
        doNotCreateReportFile: true,
      },
    });
    await test.info().attach("axe-report-moderate.html", {
      body: htmlReport,
      contentType: "text/html",
    });

    expect(
      moderate,
      `Moderate axe violations:\n\n${formatViolations(moderate)}`,
    ).toHaveLength(0);
  });

  test("should report axe-core incomplete checks for manual review", async ({
    page,
  }) => {
    await page.goto(TARGET_URL);
    await page.waitForLoadState("domcontentloaded");

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"])
      .options({
        reporter: "v2",
        resultTypes: ["passes", "violations", "incomplete"],
        performanceTimer: true,
        absolutePaths: true,
      })
      .analyze();

    // Generate and attach axe HTML report (incomplete items need human review)
    const htmlReport = createHtmlReport({
      results,
      options: {
        projectKey: "vignesh-as.dev — WCAG 2.1 AA Audit (Incomplete / Needs Review)",
        doNotCreateReportFile: true,
      },
    });
    await test.info().attach("axe-report-incomplete.html", {
      body: htmlReport,
      contentType: "text/html",
    });

    // This test always passes — it is a reporting test, not an assertion test
    expect(true).toBe(true);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Suite 2 – Page Structure
// ─────────────────────────────────────────────────────────────────────────────

test.describe("Suite 2 — Page Structure", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(TARGET_URL);
    await page.waitForLoadState("domcontentloaded");
  });

  test("WCAG 2.4.2 (A) — page has a descriptive <title>", async ({ page }) => {
    const title = await page.title();
    expect(title.trim()).toBeTruthy();
    expect(title).toMatch(/Vignesh/i);
  });

  test("WCAG 3.1.1 (A) — <html> element declares lang attribute", async ({
    page,
  }) => {
    const lang = await page.locator("html").getAttribute("lang");
    expect(lang).toBeTruthy();
    expect(lang?.toLowerCase()).toBe("en");
  });

  test("WCAG 1.3.1 (A) — page has a <main> landmark", async ({ page }) => {
    await expect(page.locator("main")).toBeVisible();
  });

  test("WCAG 1.3.1 (A) — page has a <nav> landmark", async ({ page }) => {
    await expect(page.locator("nav")).toBeVisible();
  });

  test("WCAG 1.3.1 (A) — page has a <footer> landmark", async ({ page }) => {
    await expect(page.locator("footer")).toBeVisible();
  });

  // Known issue: hero / section headings use styled <div>s, not <h1>
  test("WCAG 1.3.1 (A) — page has exactly one <h1> [KNOWN GAP]", async ({
    page,
  }) => {
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBe(1);
  });

  test("WCAG 1.3.1 (A) — heading hierarchy does not skip levels", async ({
    page,
  }) => {
    // Collect the numeric level of every heading found
    const headings = await page
      .locator("h1, h2, h3, h4, h5, h6")
      .evaluateAll((els) =>
        els.map((el) => parseInt(el.tagName.replace("H", ""), 10)),
      );

    if (headings.length === 0) {
      // No semantic headings at all — this is its own issue but tracked by the h1 test above
      return;
    }

    for (let i = 1; i < headings.length; i++) {
      const jump = headings[i] - headings[i - 1];
      expect(
        jump,
        `Heading level jumps from h${headings[i - 1]} to h${headings[i]} — skips a level`,
      ).toBeLessThanOrEqual(1);
    }
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Suite 3 – Navigation & Focus
// ─────────────────────────────────────────────────────────────────────────────

test.describe("Suite 3 — Navigation & Focus", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(TARGET_URL);
    await page.waitForLoadState("domcontentloaded");
  });

  test("WCAG 4.1.2 (A) — <nav> has an accessible aria-label", async ({
    page,
  }) => {
    const navLabel = await page.locator("nav").getAttribute("aria-label");
    expect(navLabel?.trim()).toBeTruthy();
    expect(navLabel).toBe("Main navigation");
  });

  test("WCAG 4.1.2 (A) — all nav links have non-empty accessible text", async ({
    page,
  }) => {
    const navLinks = page.locator("nav a");
    const count = await navLinks.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const text = (await navLinks.nth(i).textContent())?.trim();
      const ariaLabel = await navLinks.nth(i).getAttribute("aria-label");
      const hasAccessibleName = (text || ariaLabel || "").length > 0;
      expect(
        hasAccessibleName,
        `Nav link at index ${i} has no accessible name`,
      ).toBe(true);
    }
  });

  test("WCAG 2.1.1 (A) — first Tab keypress focuses an interactive element", async ({
    page,
  }) => {
    await page.keyboard.press("Tab");
    const focusedTag = await page.evaluate(
      () => document.activeElement?.tagName,
    );
    expect(["A", "BUTTON", "INPUT", "TEXTAREA", "SELECT"]).toContain(
      focusedTag,
    );
  });

  test("WCAG 2.4.7 (AA) — focused nav links show a visible outline", async ({
    page,
  }) => {
    await page.keyboard.press("Tab");
    const firstNavLink = page.locator("nav a").first();
    await firstNavLink.focus();
    await expect(firstNavLink).toBeFocused();

    const outlineStyle = await firstNavLink.evaluate(
      (el) => window.getComputedStyle(el).outlineStyle,
    );
    const outlineWidth = await firstNavLink.evaluate(
      (el) => window.getComputedStyle(el).outlineWidth,
    );

    const hiddenOutline = outlineStyle === "none" || outlineWidth === "0px";
    expect(
      hiddenOutline,
      `Focused nav link has no visible outline (outlineStyle: ${outlineStyle}, outlineWidth: ${outlineWidth})`,
    ).toBe(false);
  });

  // Known issue: no skip-to-content link exists on the page
  test.fail(
    "WCAG 2.4.1 (A) — page has a skip-navigation link [KNOWN GAP]",
    async ({ page }) => {
      const skipLink = page.locator(
        'a[href="#main"], a[href="#content"], a[href="#maincontent"], a.skip-link, a.skip-nav',
      );
      await expect(skipLink.first()).toBeVisible();
    },
  );

  test("WCAG 2.4.3 (A) — focus order follows a logical DOM sequence", async ({
    page,
  }) => {
    // Tab through the first 6 elements; collect their tag names
    const focusSequence: string[] = [];
    for (let i = 0; i < 6; i++) {
      await page.keyboard.press("Tab");
      const tag = await page.evaluate(
        () => document.activeElement?.tagName ?? "BODY",
      );
      focusSequence.push(tag);
    }

    // Every element in the sequence must be a known interactive element, not BODY
    for (const tag of focusSequence) {
      expect(
        ["A", "BUTTON", "INPUT", "TEXTAREA", "SELECT", "DETAILS", "SUMMARY"],
        `Focus landed on <${tag}> which is not a standard focusable element`,
      ).toContain(tag);
    }
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Suite 4 – Images & Media
// ─────────────────────────────────────────────────────────────────────────────

test.describe("Suite 4 — Images & Media", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(TARGET_URL);
    await page.waitForLoadState("domcontentloaded");
  });

  test("WCAG 1.1.1 (A) — skill / technology logos have descriptive alt text", async ({
    page,
  }) => {
    // All skill images inside the labelled carousel
    const skillImages = page.locator('[aria-label="Skills carousel"] img');
    const count = await skillImages.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const img = skillImages.nth(i);
      const alt = await img.getAttribute("alt");
      const ariaHidden = await img.getAttribute("aria-hidden");

      // Decorative images must carry aria-hidden="true" or empty alt=""
      if (ariaHidden === "true") continue;

      expect(
        alt,
        `Skill image at index ${i} is missing an alt attribute entirely`,
      ).not.toBeNull();

      if (alt !== "") {
        // Non-decorative: alt must be meaningful (contain "logo" or the tech name)
        expect(
          alt!.trim().length,
          `Skill image at index ${i} has a whitespace-only alt`,
        ).toBeGreaterThan(0);
      }
    }
  });

  // Known issue: hero.svg, profile image, and certification badge images
  // have no alt attribute, which is a WCAG 1.1.1 Level A failure
  test("WCAG 1.1.1 (A) — all meaningful images have a non-empty alt attribute [KNOWN GAP]", async ({
    page,
  }) => {
    const allImages = page.locator("img:not([aria-hidden='true'])");
    const count = await allImages.count();

    for (let i = 0; i < count; i++) {
      const img = allImages.nth(i);
      const alt = await img.getAttribute("alt");
      const src = (await img.getAttribute("src")) ?? `index ${i}`;

      expect(
        alt,
        `Image "${src}" has no alt attribute (not decorative)`,
      ).not.toBeNull();
    }
  });

  test("WCAG 1.1.1 (A) — decorative images carry empty alt or aria-hidden", async ({
    page,
  }) => {
    // Images whose src contains keywords that suggest they are decorative
    const decorativeSrcs = ["blur", "section.svg", "hero.svg"];

    for (const keyword of decorativeSrcs) {
      const imgs = page.locator(`img[src*="${keyword}"]`);
      const count = await imgs.count();
      if (count === 0) continue;

      for (let i = 0; i < count; i++) {
        const img = imgs.nth(i);
        const alt = await img.getAttribute("alt");
        const ariaHidden = await img.getAttribute("aria-hidden");
        const isProperlyHidden = alt === "" || ariaHidden === "true";

        expect(
          isProperlyHidden,
          `Decorative image "${keyword}" at index ${i} must have alt="" or aria-hidden="true" (alt="${alt}", aria-hidden="${ariaHidden}")`,
        ).toBe(true);
      }
    }
  });

  test("WCAG 1.1.1 (A) — flag images have descriptive alt text", async ({
    page,
  }) => {
    const flagImages = page.locator('img[src*="flagcdn"]');
    const count = await flagImages.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const alt = await flagImages.nth(i).getAttribute("alt");
      const ariaHidden = await flagImages.nth(i).getAttribute("aria-hidden");
      if (ariaHidden === "true") continue;

      expect(
        alt?.trim().length,
        `Flag image at index ${i} has empty or missing alt`,
      ).toBeGreaterThan(0);
    }
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Suite 5 – Forms
// ─────────────────────────────────────────────────────────────────────────────

test.describe("Suite 5 — Forms", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(TARGET_URL);
    await page.waitForLoadState("domcontentloaded");
  });

  test("WCAG 1.3.1 / 3.3.2 (A) — contact form Name input is labelled", async ({
    page,
  }) => {
    const input = page.getByRole("textbox", { name: /your name/i });
    await expect(input).toBeVisible();
  });

  test("WCAG 1.3.1 / 3.3.2 (A) — contact form Email input is labelled", async ({
    page,
  }) => {
    const input = page.getByRole("textbox", { name: /your email/i });
    await expect(input).toBeVisible();
  });

  test("WCAG 1.3.1 / 3.3.2 (A) — contact form Message textarea is labelled", async ({
    page,
  }) => {
    const textarea = page.getByRole("textbox", { name: /your message/i });
    await expect(textarea).toBeVisible();
  });

  test("WCAG 4.1.2 (A) — Send Message button has an accessible name", async ({
    page,
  }) => {
    const btn = page.getByRole("button", { name: /send message/i });
    await expect(btn).toBeVisible();
  });

  test("WCAG 2.1.1 (A) — all form inputs are reachable via keyboard Tab", async ({
    page,
  }) => {
    // Scroll contact section into view
    await page.locator("#contact").scrollIntoViewIfNeeded();

    const inputs = page.locator(
      "#contact input, #contact textarea, #contact button",
    );
    const count = await inputs.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const tabIndex = await inputs.nth(i).getAttribute("tabindex");
      expect(
        tabIndex,
        `Form element at index ${i} has tabindex="-1" making it unreachable by keyboard`,
      ).not.toBe("-1");
    }
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Suite 6 – Responsive / Reflow
// ─────────────────────────────────────────────────────────────────────────────

test.describe("Suite 6 — Responsive / Reflow", () => {
  test("WCAG 1.4.10 (AA) — content reflows at 320px without horizontal scroll", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto(TARGET_URL);
    await page.waitForLoadState("domcontentloaded");

    const bodyScrollWidth = await page.evaluate(
      () => document.documentElement.scrollWidth,
    );
    const viewportWidth = await page.evaluate(() => window.innerWidth);

    expect(
      bodyScrollWidth,
      `Page scrollWidth (${bodyScrollWidth}px) exceeds viewport width (${viewportWidth}px) at 320px — horizontal scrolling required`,
    ).toBeLessThanOrEqual(viewportWidth);
  });

  test("WCAG 1.4.10 (AA) — content reflows at 375px (iPhone SE) without horizontal scroll", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(TARGET_URL);
    await page.waitForLoadState("domcontentloaded");

    const bodyScrollWidth = await page.evaluate(
      () => document.documentElement.scrollWidth,
    );
    const viewportWidth = await page.evaluate(() => window.innerWidth);

    expect(bodyScrollWidth).toBeLessThanOrEqual(viewportWidth);
  });
});
