// MongoDB initialization script
// This script runs when MongoDB container is first created

db = db.getSiblingDB('stralshund');

// Create collections
db.createCollection('users');
db.createCollection('routes');
db.createCollection('dogspots');
db.createCollection('meetups');
db.createCollection('posts');
db.createCollection('bookings');
db.createCollection('notifications');

// Create indexes for better performance
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ username: 1 }, { unique: true });
db.users.createIndex({ location: '2dsphere' });

db.routes.createIndex({ city: 1 });
db.routes.createIndex({ startPoint: '2dsphere' });
db.routes.createIndex({ creator: 1 });

db.dogspots.createIndex({ location: '2dsphere' });
db.dogspots.createIndex({ 'location.city': 1 });
db.dogspots.createIndex({ owner: 1 });

db.meetups.createIndex({ location: '2dsphere' });
db.meetups.createIndex({ dateTime: 1 });

print('✅ StralsHund database initialized successfully!');
