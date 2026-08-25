import database from "../config/database.js";

const products = [
  ["product-1", "Aster Everyday Tote", 68],
  ["product-2", "Morrow Ceramic Set", 42],
  ["product-3", "Northline Running Jacket", 124],
  ["product-4", "Lumen Desk Lamp", 89],
  ["product-5", "Cove Wireless Headphones", 149],
];

const videos = [
  [
    "video-1",
    "product-1",
    "https://videos.pexels.com/video-files/853800/853800-hd_1920_1080_25fps.mp4",
    "Three ways to style the Aster Tote",
  ],
  [
    "video-2",
    "product-1",
    "https://videos.pexels.com/video-files/853801/853801-hd_1920_1080_25fps.mp4",
    "What fits inside the Aster Tote",
  ],
  [
    "video-3",
    "product-2",
    "https://videos.pexels.com/video-files/3129595/3129595-hd_1920_1080_25fps.mp4",
    "A calm morning with Morrow ceramics",
  ],
  [
    "video-4",
    "product-2",
    "https://videos.pexels.com/video-files/853799/853799-hd_1920_1080_25fps.mp4",
    "Set the table in under a minute",
  ],
  [
    "video-5",
    "product-3",
    "https://videos.pexels.com/video-files/3764250/3764250-hd_1920_1080_25fps.mp4",
    "The jacket built for shoulder season",
  ],
  [
    "video-6",
    "product-3",
    "https://videos.pexels.com/video-files/4496266/4496266-hd_1920_1080_25fps.mp4",
    "Pack light for a weekend outside",
  ],
  [
    "video-7",
    "product-4",
    "https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4",
    "Warm light for focused work",
  ],
  [
    "video-8",
    "product-4",
    "https://videos.pexels.com/video-files/853790/853790-hd_1920_1080_25fps.mp4",
    "Lumen lamp, three desk moods",
  ],
  [
    "video-9",
    "product-5",
    "https://videos.pexels.com/video-files/853795/853795-hd_1920_1080_25fps.mp4",
    "Find your quiet with Cove",
  ],
  [
    "video-10",
    "product-5",
    "https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_25fps.mp4",
    "A closer look at the Cove fit",
  ],
];

const engagementEvents = [
  [1, "video-1", "view"],
  [2, "video-1", "view"],
  [3, "video-1", "click"],
  [4, "video-1", "add_to_cart"],
  [5, "video-2", "view"],
  [6, "video-2", "click"],
  [7, "video-3", "view"],
  [8, "video-3", "view"],
  [9, "video-3", "click"],
  [10, "video-3", "add_to_cart"],
  [11, "video-4", "view"],
  [12, "video-5", "view"],
  [13, "video-5", "click"],
  [14, "video-5", "add_to_cart"],
  [15, "video-6", "view"],
  [16, "video-7", "view"],
  [17, "video-7", "click"],
  [18, "video-8", "view"],
  [19, "video-9", "view"],
  [20, "video-10", "view"],
];

const insertProduct = database.prepare(
  "INSERT OR IGNORE INTO Products (id, name, price) VALUES (?, ?, ?)",
);
const insertVideo = database.prepare(
  "INSERT OR IGNORE INTO Videos (id, productId, videoUrl, title) VALUES (?, ?, ?, ?)",
);
const insertEngagementEvent = database.prepare(
  "INSERT OR IGNORE INTO EngagementEvents (id, videoId, eventType) VALUES (?, ?, ?)",
);

const seed = database.transaction(() => {
  for (const product of products) insertProduct.run(...product);
  for (const video of videos) insertVideo.run(...video);
  for (const event of engagementEvents) insertEngagementEvent.run(...event);
});

seed();
console.log(
  `Seed complete: ${products.length} products, ${videos.length} videos, and ${engagementEvents.length} engagement events available.`,
);
database.close();
