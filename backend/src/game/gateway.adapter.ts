import { IoAdapter } from '@nestjs/platform-socket.io';
import { AuthPayload, SocketWithAuth } from '../common/types';
import { ServerOptions } from 'socket.io';

export class WebsocketAdapter extends IoAdapter {
  createIOServer(port: number, options?: ServerOptions) {
    const server = super.createIOServer(port, {
      ...options,
      cors: { origin: '*' },
    });

    server.use(async (socket: SocketWithAuth, next) => {
      const { userId } = socket.handshake.query as AuthPayload;

      try {
        socket.userId = userId;
      } catch (error) {
        next(new Error('Forbidden'));
      }

      next();
    });

    return server;
  }
}
