import * as tt from '../../node_modules/telegraf/typings/telegram-types.d';
import User from '../models/User';
import GDriveService from '../services/GDriveService';
import { Extra, Middleware, SceneContext, SceneContextMessageUpdate } from 'telegraf';
import { RedisClient } from 'redis';

import WizardContext from '../helpers/wizard/context';

import TrelloService from '../services/TrelloService';

declare module 'telegraf' {
    export class ContextMessageUpdate implements SceneContextMessageUpdate {
        // public dbchat: InstanceType<Chat>

        redis: RedisClient;
        user: User | undefined;
        wizard: WizardContext<this>;
        scene: SceneContext<this>;
        session: any; // вот тут творится полная анархия. одни классы пишут, другие пытаются использовать...
        gdrive: GDriveService;
        trello: TrelloService;

        replyWithMarkdown(markdown: string, extra?: tt.ExtraEditMessage | Extra): Promise<tt.Message>;
    }

    export interface Composer<TContext extends ContextMessageUpdate> {
        action(
            action: string | string[] | RegExp,
            middleware: Middleware<TContext>,
            ...middlewares: Array<Middleware<TContext>>
        ): Composer<TContext>;
    }
}
