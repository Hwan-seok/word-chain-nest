import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client, Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JWTService } from '../auth/jwt/jwt.service';
import { UserEntity } from '../user/user.entity';
import { RoomService } from '../room/room.service';

@WebSocketGateway({ namespace: '/line' })
export class ChatEvents implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly jwtService: JWTService,
    private readonly roomService: RoomService,
  ) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(socket) {
    const { roomNum, userId } = await this.throughConnection(socket);

    this.roomService.joinUser(roomNum, userId);
    socket.join(roomNum);
    this.server.to(roomNum).emit('joinUser', userId);
  }
  async handleDisconnect(socket) {
    const { roomNum, userId } = await this.throughConnection(socket);
    
    this.roomService.leaveUser(roomNum, userId);
    socket.leave(roomNum);
    this.server.to(roomNum).emit('leaveUser', userId);
  }

  @SubscribeMessage('events')
  findAll(socket: Socket, data: any) {
    socket.broadcast.to('1').emit('events', 'asdf');
  }

  @SubscribeMessage('identity')
  async identity(client: Client, data: number): Promise<number> {
    return data;
  }

  async throughConnection(socket): Promise<any> {
    const param = socket.handshake.query;
    const accessToken: string = param.token;
    const roomNum: string = param.roomNum;

    const user: UserEntity = await this.jwtService.verify(accessToken, true);
    const userId = user.id;

    return { roomNum, userId };
  }
}
