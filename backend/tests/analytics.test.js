import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { mkdtemp, rm } from "node:fs/promises";
import { createServer } from "node:http";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const databaseDirectory = await mkdtemp(
  path.join(os.tmpdir(), "reelmetric-test-"),
);
process.env.DATABASE_PATH = path.join(databaseDirectory, "test.sqlite");

const schema = await readFile(
  new URL("../src/db/schema.sql", import.meta.url),
  "utf8",
);
const { default: database } = await import("../src/config/database.js");
database.exec(`${schema}
  INSERT INTO Products (id, name, price) VALUES ('product-1', 'Test product', 10);
  INSERT INTO Videos (id, productId, videoUrl, title) VALUES
    ('video-1', 'product-1', 'https://example.com/video.mp4', 'Test video');
  INSERT INTO EngagementEvents (videoId, eventType) VALUES
    ('video-1', 'view'), ('video-1', 'click'), ('video-1', 'add_to_cart');
`);
const { default: app } = await import("../src/app.js");

const server = createServer(app);
await new Promise((resolve) => server.listen(0, resolve));
const baseUrl = `http://127.0.0.1:${server.address().port}`;

test.after(async () => {
  await new Promise((resolve) => server.close(resolve));
  database.close();
  await rm(databaseDirectory, { recursive: true, force: true });
});

test("returns paginated video metrics and ingests events", async () => {
  const initialResponse = await fetch(
    `${baseUrl}/api/analytics/videos?page=1&limit=1`,
  );
  assert.equal(initialResponse.status, 200);
  const initial = await initialResponse.json();
  assert.equal(initial.pagination.totalCount, 1);
  assert.equal(initial.pagination.totalPages, 1);
  assert.deepEqual(initial.data[0], {
    id: "video-1",
    title: "Test video",
    videoUrl: "https://example.com/video.mp4",
    totalViews: 1,
    totalClicks: 1,
    totalAddToCart: 1,
  });

  const eventResponse = await fetch(`${baseUrl}/api/events`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ videoId: "video-1", eventType: "view" }),
  });
  assert.equal(eventResponse.status, 201);

  const updatedResponse = await fetch(`${baseUrl}/api/analytics/videos`);
  const updated = await updatedResponse.json();
  assert.equal(updated.data[0].totalViews, 2);
});

test("rejects invalid event payloads", async () => {
  const response = await fetch(`${baseUrl}/api/events`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ videoId: "video-1", eventType: "purchase" }),
  });
  assert.equal(response.status, 400);
});
