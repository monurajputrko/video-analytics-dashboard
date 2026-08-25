PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS Products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price REAL NOT NULL CHECK (price >= 0),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Videos (
  id TEXT PRIMARY KEY,
  productId TEXT NOT NULL,
  videoUrl TEXT NOT NULL,
  title TEXT NOT NULL,
  FOREIGN KEY (productId) REFERENCES Products(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS EngagementEvents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  videoId TEXT NOT NULL,
  eventType TEXT NOT NULL CHECK (eventType IN ('view', 'click', 'add_to_cart')),
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (videoId) REFERENCES Videos(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_engagement_events_video_id ON EngagementEvents(videoId);
CREATE INDEX IF NOT EXISTS idx_engagement_events_type ON EngagementEvents(eventType);
