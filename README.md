<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Meeting Room Booking API

A NestJS-based API for managing meeting room bookings.

## Features

- View available meeting rooms
- Create, read, update and delete room bookings
- Automatic conflict detection for bookings
- Input validation
- Error handling

## Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)

## Installation

```bash
# Clone the repository
git clone https://github.com/arpitsinghania8/meeting-room-api.git
cd meeting-room-api

# Install dependencies
npm install
```

## Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

The API will be available at `http://localhost:3000`

## API Endpoints

### Rooms

- `GET /rooms` - Get all meeting rooms

### Bookings

- `GET /rooms/:roomId/bookings` - Get all bookings for a room
- `POST /rooms/:roomId/bookings` - Create a new booking
- `PUT /rooms/:roomId/bookings/:bookingId` - Update a booking
- `DELETE /rooms/:roomId/bookings/:bookingId` - Delete a booking

## Example Request

Create a booking:

```bash
curl -X POST http://localhost:3000/rooms/1/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user123",
    "startTime": "2025-03-01T10:00:00Z",
    "endTime": "2025-03-01T11:00:00Z"
  }'
```

## Running Tests

```bash
# Unit tests
npm run test

# Test coverage
npm run test:cov

# E2E tests
npm run test:e2e
```

## Development

The project follows a modular structure:

```
src/
├── modules/
│   ├── rooms/
│   │   └── [room-related files]
│   └── bookings/
│       └── [booking-related files]
└── [app configuration files]
```

## License

[MIT Licensed](LICENSE)
