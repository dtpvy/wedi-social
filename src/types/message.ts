import type { Message, User } from '@prisma/client';

export type MessageDetail = Message & { sender: User; receiver: User };
