'use strict';

module.exports = [
  { route: '/', action: 'rooms/room' },
  { route: '/new', action: 'rooms/create' },
  { route: '/fork', action: 'rooms/fork' },
  { route: '/random', action: 'rooms/random' },
  { route: '/rooms/:room', action: 'rooms/room' }
];
